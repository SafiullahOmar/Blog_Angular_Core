import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styles: [
  ]
})
export class AddRoleComponent implements OnInit {

  addRoleForm = this.fb.group({
    roleName: ['', Validators.required]

  });

  constructor(private fb: FormBuilder, private ser: UserService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    let roleName = this.addRoleForm.controls["roleName"].value;
    this.ser.addRole(roleName)
      .subscribe((data) => {
        console.log(data);
        this.addRoleForm.controls["roleName"].setValue("");
      }, error => {
        console.log(error);
      })

  }
}
