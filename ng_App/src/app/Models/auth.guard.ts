import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from './constants';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {

     
      const user=JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
      if(user&&user.email){
        return true;
      }else{
        this.router.navigate(["login"]);
        return false;
      }
  }

  
  
}
