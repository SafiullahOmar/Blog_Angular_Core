import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  ngOnInit(): void {
  }

  onSubmit() {

    let fullName = this.registerForm.controls["fullName"].value;
    let email = this.registerForm.controls["email"].value;
    let password = this.registerForm.controls["password"].value;

    this.ser.register(email, password, fullName)
      .subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      })

  }

}
