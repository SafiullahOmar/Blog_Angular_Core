import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL:string="https://localhost:44354/api/";
  constructor(private http:HttpClient) { }

  public login(email:string,password:string){
    const body={
      Email:email,
      password:password
    }

    return this.http.post(this.baseURL+"user/Login",body);
  }

  public register(email:string,password:string,fullName:string){
    const body={
      Email:email,
      password:password,
      FullName:fullName
    }

    return this.http.post(this.baseURL+"user/RegisterUser",body);
  }

  public getAlluser(){
    const header=new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem("data")}`
    });
    return this.http.get(this.baseURL+"user/GetAllUsers",{headers:header});
  }
}
