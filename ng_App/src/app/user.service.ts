import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from './Models/ResponseModel';
import{ map} from 'rxjs/operators';
import { ResponseCode } from './Models/responseCode';
import { User } from './Models/user';
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

    return this.http.post<ResponseModel>(this.baseURL+"user/Login",body);
  }

  public register(email:string,password:string,fullName:string){
    const body={
      Email:email,
      password:password,
      FullName:fullName
    }

    return this.http.post<ResponseModel>(this.baseURL+"user/RegisterUser",body);
  }

  public getAlluser(){
    let userinfo=JSON.parse(localStorage.getItem("userInfo")!);
    const header=new HttpHeaders({
      'Authorization':`Bearer ${userinfo?.token}`
    });
    return this.http.get<ResponseModel>(this.baseURL+"user/GetAllUsers",{headers:header}).pipe(map(res=>{
      let userList=new Array<User>();
      if(res.ReponseCode==ResponseCode.OK){
       
        if(res.Dataset){
          res.Dataset.map((x:User)=>{
            userList.push(new User(x.email,x.fullName,x.userName));
          });
        }

       
      }
      return userList;
    }));
  }
}
