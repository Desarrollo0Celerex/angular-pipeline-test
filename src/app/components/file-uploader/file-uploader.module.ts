import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
  declarations: [
    FileUploaderComponent
  ],
  exports: [
    FileUploaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FileUploaderModule { }
