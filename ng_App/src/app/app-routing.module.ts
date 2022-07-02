import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsrMgtComponent } from './usr-mgt/usr-mgt.component';
import{AuthGuard} from './Models/auth.guard';
import { AddRoleComponent } from './add-role/add-role.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'mgt',component:UsrMgtComponent,canActivate:[AuthGuard]},
  {path:'addrole',component:AddRoleComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
