import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'buffer';

import { Constants } from './Models/constants';
import { User } from './Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng_App';
constructor(private router:Router){

} 

onLogOut(){
  localStorage.removeItem(Constants.USER_KEY);
  console.log(Constants.USER_KEY);
  this.router.navigate(["login"]);
}
get isUserLogin(){
    const user=localStorage.getItem(Constants.USER_KEY);
    return user && user.length>0;
}

get user():User{
  return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
}

get isAdmin():boolean{
  return this.user.roles.indexOf('admin')>-1;
}

get isUser():boolean{
  return this.user.roles.indexOf('user')>-1;
}

}
 