using CoreAPIs.Data.Entities;
using CoreAPIs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.IService
{
    public interface IArticleService
    {
         Task<Article> AddUpdate(int id, string title, string content, string authorid, bool publishStatus);
        Task<bool> DeleteArticle(int id);
        Task<List<ArticleVM>> GetArticles(string authorId);
    }
}
