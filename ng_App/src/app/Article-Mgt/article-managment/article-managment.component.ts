import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ArticleSerService } from '../article-ser.service';

@Component({
  selector: 'app-article-managment',
  templateUrl: './article-managment.component.html',
  styles: [
  ]
})
export class ArticleManagmentComponent implements OnInit {

  public articles:any=[];
  constructor(private ser:ArticleSerService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){

    this.ser.getArticleByAuthorId().subscribe((data:any)=>{
      this.users=data;
      console.log(this.users);
    });
  }

}
