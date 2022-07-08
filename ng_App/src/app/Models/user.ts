export class User {
  public userId:string="";
    public fullName:string="";
    public email:string="";
    public userName:string="";
    public roles:string[]=[];
  
    constructor(email:string,fullName:string,userName:string,roles:string[],userId:string) {
      this.fullName=fullName;
      this.email=email;
      this.userName=userName;
      this.roles=roles
      this.userId=userId;
    }
}
