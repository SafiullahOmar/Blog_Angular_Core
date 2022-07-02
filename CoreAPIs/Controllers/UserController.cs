using CoreAPIs.Data.Entities;
using CoreAPIs.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CoreAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManger;
        private readonly RoleManager<IdentityRole> _roleInManger;

        private readonly JWTConfig _jwtConfig;

        public UserController( UserManager<AppUser> UserManager, SignInManager<AppUser> SignInManger,IOptions<JWTConfig> jwtConfig, RoleManager<IdentityRole> RoleInMang)
        {
            _userManager = UserManager;
            _signInManger = SignInManger;
            _roleInManger = RoleInMang;
            _jwtConfig = jwtConfig.Value;

        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<object> RegisterUser(UserRegistration model) {

            try
            {
                if (! await _roleInManger.RoleExistsAsync(model.Role)) {
                    return await Task.FromResult(new ResponseVM(ResponseCode.Error, "Role does not Exist", null));
                }

                var user = new AppUser() {  FullName = model.FullName,UserName=model.Email, Email = model.Email, DateCreated = DateTime.UtcNow, DateModified = DateTime.UtcNow };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var tempUser = await _userManager.FindByEmailAsync(model.Email);
                    await _userManager.AddToRoleAsync(tempUser, model.Role);
                    return await Task.FromResult(new ResponseVM(ResponseCode.OK, "User Has Been Created",null));
                }

                return await Task.FromResult(new ResponseVM(ResponseCode.Error,"", string.Join(",", result.Errors.Select(x => x.Description).ToArray())));
            }
            catch (Exception ex) {
                return await Task.FromResult(ex.Message);
            }
        }


 


        [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        
        [Route("GetAllUsers")]
        public async Task<object> GetAllUsers()
        {

            try
            {
                //var users =  _userManager.Users.Select(x=>new UserVM(x.FullName,x.UserName,x.DateCreated,x.Email))    ;
                List<UserVM> allUsers = new List<UserVM>(); 
                var users = _userManager.Users.ToList();
                foreach (var user in users) {
                    var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
                    allUsers.Add(new UserVM(user.FullName, user.UserName, user.DateCreated, user.Email, role));
                }
               
                return await Task.FromResult(new ResponseVM(ResponseCode.OK,"", users));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseVM(ResponseCode.Error, ex.Message,""));
            }
        }
       
        [HttpGet]
        [Route("getRoles")]
        public async Task<object> getRoles()
        {

            try
            {
                var roles = _roleInManger.Roles.Select(x => x.Name).ToList();
                return await Task.FromResult(new ResponseVM(ResponseCode.OK, "",roles));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseVM(ResponseCode.Error, ex.Message, ""));
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<object> Login(LoginVM model)
        {

            try
            {
                var result = await _signInManger.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (result.Succeeded)
                {
                    var Appusr =await _userManager.FindByEmailAsync(model.Email);
                    var role = "user";
                   // var role = (await _userManager.GetRolesAsync(Appusr)).FirstOrDefault();
                    var usr = new UserVM(Appusr.FullName, Appusr.UserName, Appusr.DateCreated, Appusr.Email,role);
                    usr.Token = GenerateToken(Appusr,role);
                    return await Task.FromResult(new ResponseVM(ResponseCode.OK ,"",usr));
                }

                return await Task.FromResult(new ResponseVM(ResponseCode.Error,"Invalid Login or UserName",""));
            }
            catch (Exception ex)
            {
                  return await Task.FromResult(new ResponseVM(ResponseCode.Error, ex.Message,""));
            }
        }

        public string GenerateToken(AppUser user,string role) {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.key);
            var Auiendence =_jwtConfig.Auiedence;
            var Issuer = _jwtConfig.Issuer;
            var tokenDescriptor = new SecurityTokenDescriptor
            { 
                Subject = new System.Security.Claims.ClaimsIdentity(new[] {
                    new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, role)

                }),

                Expires = DateTime.UtcNow.AddHours(12),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                                            SecurityAlgorithms.HmacSha256Signature),
                Audience=Auiendence,
                Issuer=Issuer

            };

            var tokens = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(tokens); 
        }

        [HttpPost("AddRole")]
        public async Task<object> AddRole(Role model) {
            try {
                if (model.RoleName == "" || model == null) {
                    return await Task.FromResult(new ResponseVM(ResponseCode.Error, "Paramters are missing", ""));
                }
                if (await _roleInManger.RoleExistsAsync(model.RoleName)) {
                    return await Task.FromResult(new ResponseVM(ResponseCode.Error, "Role exists", ""));
                }                

                var result=await _roleInManger.CreateAsync(new IdentityRole(model.RoleName));
                if (result.Succeeded) {
                    return await Task.FromResult(new ResponseVM(ResponseCode.OK, "Role Added",null));
                }

                return await Task.FromResult(new ResponseVM(ResponseCode.Error, "Something Went Wrong", ""));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseVM(ResponseCode.Error, ex.Message, ""));
            }

        }

    }
}
