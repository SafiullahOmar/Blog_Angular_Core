import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsrMgtComponent } from './usr-mgt/usr-mgt.component';
import{AuthGuard} from './Models/auth.guard';
import { AddRoleComponent } from './add-role/add-role.component';
import { ArticleManagmentComponent } from './Article-Mgt/article-managment/article-managment.component';
import { AddUpdateArticleComponent } from './Article-Mgt/add-update-article/add-update-article.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent,canActivate:[AuthGuard]},
  {path:'mgt',component:UsrMgtComponent,canActivate:[AuthGuard]},
  {path:'addrole',component:AddRoleComponent,canActivate:[AuthGuard]},
  {path:'articleManagment',component:ArticleManagmentComponent,canActivate:[AuthGuard]},
  {path:'addUpdateArticle',component:AddUpdateArticleComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
