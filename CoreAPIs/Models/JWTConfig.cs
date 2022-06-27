using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.Models
{
    public class JWTConfig
        {

        public string key { get; set; }
        public string Auiedence { get; set; }
        public string Issuer { get; set; }
    }
}
