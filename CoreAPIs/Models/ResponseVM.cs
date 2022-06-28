using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.Models
{
    public class ResponseVM
    {
        public ResponseVM(ResponseCode responseCode,string  responMessage,object dataset)
        {
            ResponseCode = responseCode;
            ResponseMessage = responMessage;
            Dataset = dataset;

        }
        public ResponseCode ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        public object Dataset { get; set; }
    }
}
