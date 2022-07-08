import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/Models/constants';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/user.service';
import { Article } from '../Article';
import { ArticleSerService } from '../article-ser.service';

@Component({
  selector: 'app-article-managment',
  templateUrl: './article-managment.component.html',
  styles: [
  ]
})
export class ArticleManagmentComponent implements OnInit {

  public articleList:Article[]=[];
  constructor(private ser:ArticleSerService) { }

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle(){

    this.ser.getArticleByAuthorId(this.user.userId).subscribe((data:Article[])=>{
      this.articleList=data;
      
    });
  }

  get user():User{
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  onAddNew(){}
  onEdit(id:number){}
  onDelete(){

  }

}
