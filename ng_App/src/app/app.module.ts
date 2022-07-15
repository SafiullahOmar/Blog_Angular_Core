import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './Article-Mgt/modals/confirm-modal/confirm-modal.component';
import {ToastrModule} from 'ngx-toastr'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MyCkEditorComponent } from './sharedModules/ck-editor-module/my-ck-editor/my-ck-editor.component';
import { MymoduleModule } from './sharedModules/ck-editor-module/mymodule/mymodule.module';


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
    BrowserAnimationsModule,  
    BlockUIModule.forRoot({
      template: BlockUIintegratedComponent
    }),   
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    MymoduleModule
  ],
  entryComponents:[BlockUIintegratedComponent,ConfirmModalComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService,BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
