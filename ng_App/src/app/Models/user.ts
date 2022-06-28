export class User {
    public fullName:string="";
    public email:string="";
    public userName:string="";
  
    constructor(email:string,fullName:string,userName:string) {
      this.fullName=fullName;
      this.email=email;
      this.userName=userName;

    }
}
