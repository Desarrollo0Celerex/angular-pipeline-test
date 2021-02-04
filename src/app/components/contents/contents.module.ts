import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsComponent } from './contents.component';

@NgModule({
  declarations: [ContentsComponent],
  exports: [ContentsComponent],
  imports: [
    CommonModule
  ]
})
export class ContentsModule { }
