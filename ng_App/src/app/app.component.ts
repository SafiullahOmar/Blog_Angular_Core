import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from './Models/constants';

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

}
 