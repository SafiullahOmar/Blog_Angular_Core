import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

    loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]

    });

  constructor(private fb:FormBuilder,private ser:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log('subbmiteed');
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;

    this.ser.login(email, password)
      .subscribe((data:any) => {

        if(data.ReponseCode==1){
          console.log(data);
          localStorage.setItem("userInfo",JSON.stringify(data.Dataset));
          this.router.navigate(["/mgt"]);
        }
       

      }, error => {
        console.log(error);
      })
  }
}
