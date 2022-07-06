using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.Models
{
    public class ArticleVM
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public bool Publish { get; set; }
        public int Id { get; set; }

        public string AuthorName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string AppUserId { get; set; }
    }
}
