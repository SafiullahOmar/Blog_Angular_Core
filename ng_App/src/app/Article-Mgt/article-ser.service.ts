import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from 'buffer';
import { map } from 'rxjs/operators';
import { Constants } from '../Models/constants';
import { ResponseCode } from '../Models/responseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { Article } from './Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleSerService {

  constructor(private http:HttpClient) { }

  public getArticleByAuthorId(authorId:string){

    console.log(localStorage.getItem(Constants.USER_KEY));
    let userinfo=JSON.parse(localStorage.getItem(Constants.USER_KEY)!);
      
    const header=new HttpHeaders({
      'Authorization':`Bearer ${userinfo?.token}`
    });
    return this.http.get<ResponseModel>(Constants.BASE_URL+"Article/GetArticleList?authorId="+authorId,{headers:header}).pipe(map(res=>{
      let articleList=new Array<Article>();
      if(res.responseCode==ResponseCode.OK){
       
        if(res.dataset){
          console.log(res.dataset);
          res.dataset.map((x:any)=>{
            articleList.push(new Article(x.id,x.title,x.body,x.publish,x.createdDate,x.modifiedDate));
          });
        }

       
      }
      return articleList;
    }));
  }
}
