using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.Models
{
    public class UserVM
    {
        public UserVM( string fullName,string userName,DateTime dateCreated, string email,string role)
        {
            FullName = fullName;
            UserName = userName;
            DateCreated = dateCreated;
            Email = email;
            Role = role;
        }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public DateTime DateCreated { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }

    }
}
