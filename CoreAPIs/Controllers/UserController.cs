using CoreAPIs.Data.Entities;
using CoreAPIs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManger;

        public UserController( UserManager<AppUser> UserManager, SignInManager<AppUser> SignInManger)
        {
            _userManager = UserManager;
            _signInManger = SignInManger;
        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<object> RegisterUser(UserRegistration model) {

            try
            {
                var user = new AppUser() { FullName = model.FullName,UserName=model.FullName, Email = model.Email, DateCreated = DateTime.UtcNow, DateModified = DateTime.UtcNow };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return await Task.FromResult("User Has Been Created");
                }

                return await Task.FromResult(string.Join(",", result.Errors.Select(x => x.Description).ToArray()));
            }
            catch (Exception ex) {
                return await Task.FromResult(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<object> GetAllUsers()
        {

            try
            {
                var users =  _userManager.Users.Select(x=>new UserVM(x.FullName,x.UserName,x.DateCreated,x.Email))    ;
                return await Task.FromResult(users);

            }
            catch (Exception ex)
            {
                return await Task.FromResult(ex.Message);
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<object> Login(LoginVM model)
        {

            try
            {
                var result = await _signInManger.PasswordSignInAsync(model.UserName, model.Password, false, false);
                if (result.Succeeded)
                {
                    return await Task.FromResult("Login is Valid");
                }

                return await Task.FromResult("Invalid Login or UserName");
            }
            catch (Exception ex)
            {
                return await Task.FromResult(ex.Message);
            }
        }



    }
}
