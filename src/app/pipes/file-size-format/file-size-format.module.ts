import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSizeFormatPipe } from './file-size-format.pipe';

@NgModule({
  declarations: [FileSizeFormatPipe],
  exports: [FileSizeFormatPipe],
  imports: [
    CommonModule
  ]
})
export class FileSizeFormatModule { }
