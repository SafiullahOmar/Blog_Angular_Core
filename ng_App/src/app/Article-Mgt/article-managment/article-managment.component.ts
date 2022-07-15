import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Models/constants';
import { ResponseCode } from 'src/app/Models/responseCode';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/user.service';
import { AddUpdateArticleComponent } from '../add-update-article/add-update-article.component';
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
  constructor(private ser: ArticleSerService, private modalService: BsModalService,
    private toast: ToastrService) { }

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

  onAddNew() {
    const initialState: ModalOptions = {
      initialState: {
       

      },
      ignoreBackdropClick:true,
      backdrop:true,
      class:'modal-lg'
    };
    const bsModalRef = this.modalService.show(AddUpdateArticleComponent, initialState);
    bsModalRef.content.modalResponse2.subscribe(result => {
      if(result){

      }
    });
   }

  onEdit(id: number) { }
  onDelete(articleId: number) {
    const initialState: ModalOptions = {
      initialState: {
        message: "Do you want to delete ?",
        confirmTitle: "Yes",
        declineTitle: "NO"

      }
    };
    const bsModalRef = this.modalService.show(ConfirmModalComponent, initialState);
    bsModalRef.content.modalResponse2.subscribe(result => {
      this.ser.deleteArticle(articleId).subscribe((res) => {
        if (res.responseCode == ResponseCode.OK) {
          this.toast.success("Successfully deleted");
          this.getAllArticle();
        } else {
          this.toast.error("Something went wrong");
        }
      }, (err) => {
        this.toast.error("error has occured");
      })
    });
  }

}
