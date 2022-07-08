import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import{ HttpClientModule  } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { UsrMgtComponent } from './usr-mgt/usr-mgt.component';
import { HomeComponent } from './home/home.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { BlockUIintegratedComponent } from './sharedModules/block-uiintegrated/block-uiintegrated.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsrMgtComponent,
    HomeComponent,
    AddRoleComponent,
    BlockUIintegratedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BlockUIModule.forRoot({
      template: BlockUIintegratedComponent
    })
  ],
  entryComponents:[BlockUIintegratedComponent],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
