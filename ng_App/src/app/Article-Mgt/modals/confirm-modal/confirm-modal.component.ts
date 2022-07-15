import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styles: [
  ]
})
export class ConfirmModalComponent implements OnInit {

  @Input() message: string;
  @Input() confirmTitle: string;
  @Input() declineTitle: string;
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
