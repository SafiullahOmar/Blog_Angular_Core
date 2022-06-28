import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usr-mgt',
  templateUrl: './usr-mgt.component.html',
  styles: [
  ]
})
export class UsrMgtComponent implements OnInit {

  public users=[];
  constructor(private ser:UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){

    this.ser.getAlluser().subscribe((data:any)=>{
      this.users=data;
      console.log(this.users);
    });
  }

}
