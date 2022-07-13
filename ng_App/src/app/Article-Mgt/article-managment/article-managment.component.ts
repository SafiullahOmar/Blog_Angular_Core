import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Constants } from 'src/app/Models/constants';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/user.service';
import { Article } from '../Article';
import { ArticleSerService } from '../article-ser.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-article-managment',
  templateUrl: './article-managment.component.html',
  styles: [
  ]
})
export class ArticleManagmentComponent implements OnInit {

  public articleList: Article[] = [];
  constructor(private ser: ArticleSerService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle() {

    this.ser.getArticleByAuthorId(this.user.userId).subscribe((data: Article[]) => {
      this.articleList = data;

    });
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  onAddNew() { }
  onEdit(id: number) { }
  onDelete() {
    const initialState: ModalOptions = {
      initialState: {
        message:"Do you want to delete ?",
        confirmTitle:"Yes",
        declineTitle:"NO"
        
      }
    };
    const bsModalRef = this.modalService.show(ConfirmModalComponent, initialState);
    bsModalRef.content.modalResponse2.subscribe(result=>{

    });
  }

}
