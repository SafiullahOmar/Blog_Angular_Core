using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.Models
{
    public class UserRegistration
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string  Password { get; set; }
        public List<string> Roles { get; set; }
    }
}
