import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCkEditorComponent } from '../my-ck-editor/my-ck-editor.component';



@NgModule({
  declarations: [MyCkEditorComponent],
  exports:[MyCkEditorComponent],
  imports: [
    CommonModule
  ]
})
export class MymoduleModule { }
