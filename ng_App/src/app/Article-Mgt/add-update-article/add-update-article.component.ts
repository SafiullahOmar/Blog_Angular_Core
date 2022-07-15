import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-update-article',
  templateUrl: './add-update-article.component.html',
  styles: [
  ]
})
export class AddUpdateArticleComponent implements OnInit {

  public title:string="";
  public confirmButtonTitle='Add';
  public modalResponse2:Subject<boolean>;
  constructor(public bsModalRef: BsModalRef) { 


  }

  ngOnInit(): void {

    this.modalResponse2=new Subject(); 
  }


  confirm() {

    this.bsModalRef.hide();
    this.modalResponse2.next(true);

  }

  decline() {
    this.bsModalRef.hide();
    this.modalResponse2.next(false);
    
  }

}
