﻿using CoreAPIs.IService;
using CoreAPIs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        public IArticleService _articleService;
        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [Authorize(Roles = "admin,user")]
        [HttpPost]
        [Route("AddUpdate")]
        public async Task<object> AddUpdateArticle([FromBody] ArticleVM model)
        {

            try
            {
                if (model == null||model.Title.Length<1)
                {
                    return await Task.FromResult(new ResponseVM(ResponseCode.Error, "Parameters are missin", null));
                }

                var result = await _articleService.AddUpdate(model.Id, model.Title, model.Body, model.AppUserId, model.Publish);


                return await Task.FromResult(new ResponseVM(ResponseCode.OK,(model.Id>0? "Record updated":"Record Inserted"), result));



            }
            catch (Exception ex)
            {
                return await Task.FromResult(ex.Message);
            }
        }

        [Authorize(Roles = "admin,user")]
        [HttpPost]
        [Route("delete")]
        public async Task<object> deleteArticle([FromBody]int id)
        {

            try
            {
                if (id < 1) {
                    return await Task.FromResult(new ResponseVM(ResponseCode.Error, "Parameters are missin", null));
                }

                var result =await _articleService.DeleteArticle(id);
                return await Task.FromResult(new ResponseVM(ResponseCode.OK, "Record Deleted", null));



            }
            catch (Exception ex)
            {
                return await Task.FromResult(ex.Message);
            }
        }
    }
  


}