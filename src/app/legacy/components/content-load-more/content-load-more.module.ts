import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentLoadMoreComponent } from './content-load-more.component';

@NgModule({
  declarations: [ContentLoadMoreComponent],
  exports: [ContentLoadMoreComponent],
  imports: [
    CommonModule
  ]
})
export class ContentLoadMoreModule { }
