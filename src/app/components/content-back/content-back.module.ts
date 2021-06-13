import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentBackComponent } from './content-back.component';

@NgModule({
  declarations: [ContentBackComponent],
  exports: [ContentBackComponent],
  imports: [
    CommonModule
  ]
})
export class ContentBackModule { }
