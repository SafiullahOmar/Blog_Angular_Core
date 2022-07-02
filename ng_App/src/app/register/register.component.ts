import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Roles } from '../Models/roles';

import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    fullName: ['', Validators.required]

  });
  constructor(private fb: FormBuilder, private ser: UserService) { }

  roles:Roles[]=[];
  ngOnInit(): void {
    this.getAllRoles();
  }

  onSubmit() {

    let fullName = this.registerForm.controls["fullName"].value;
    let email = this.registerForm.controls["email"].value;
    let password = this.registerForm.controls["password"].value;


    this.ser.register(email, password, fullName,this.roles.filter(x=>x.isSelected)[0].role)
      .subscribe((data) => {
        console.log(data);
        this.registerForm.controls["fullName"].setValue("");
        this.registerForm.controls["email"].setValue("");
        this.registerForm.controls["password"].setValue("");
        this.roles.forEach(x=>{x.isSelected=false});
      }, error => {
        console.log(error);
      })

  }

  getAllRoles(){
    this.ser.getAllRoles().subscribe(roles=>{
      this.roles=roles;
    });
  }

  onRoleChange(role:string){
this.roles.forEach(x=>{
  if(x.role==role){
    x.isSelected=true;
  }else{
    x.isSelected=false;
  }
})

  }

}
