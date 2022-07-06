using CoreAPIs.Data;
using CoreAPIs.Data.Entities;
using CoreAPIs.IService;
using CoreAPIs.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.Service
{
    public class ArticleService : IArticleService
    {
        public readonly AppDBContext _context;
        public ArticleService(AppDBContext context)
        {
            _context = context;
        }
        public async Task<Article> AddUpdate(int id, string title, string content, string authorid, bool publishStatus)
        {
            var tempArticle = _context.Articles.FirstOrDefault(x => x.Id == id);
            if (tempArticle == null) {
                tempArticle = new Article() { 
                Title=title,
                Body=content,
                AppUserId=authorid,
                Created=DateTime.UtcNow,
                Modified=DateTime.UtcNow,
                Publish=publishStatus
                };

               await _context.Articles.AddAsync(tempArticle);
                await _context.SaveChangesAsync();
                return tempArticle;
            }

            tempArticle.Title = title;
            tempArticle.Body = content;
            tempArticle.Publish = publishStatus;
            tempArticle.Modified = DateTime.UtcNow;
            _context.Update(tempArticle);
            await _context.SaveChangesAsync();
            return tempArticle;
        }

        public async Task<bool> DeleteArticle(int id)
        {
            var tempArticle = _context.Articles.FirstOrDefault(x => x.Id == id);
            if (tempArticle == null)
                return  await Task.FromResult(true);
            _context.Remove(tempArticle);
            await _context.SaveChangesAsync();
            return await Task.FromResult(true);
        }

        public async Task<List<ArticleVM>> GetArticles(string authorId)
        {
            return await (
                from article in _context.Articles
                where article.AppUserId == authorId
                select new ArticleVM()
                {
                    Title = article.Title,
                    Body = article.Body,
                    Publish = article.Publish,
                    AppUserId = article.AppUserId,
                    AuthorName = article.AppUser.FullName,
                    CreatedDate = article.Created,
                    Id=article.Id

                }

                ).ToListAsync();
        }
    }
}
