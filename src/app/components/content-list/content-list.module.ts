import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentListComponent } from './content-list.component';

@NgModule({
  declarations: [ContentListComponent],
  exports: [ContentListComponent],
  imports: [
    CommonModule
  ]
})
export class ContentListModule { }
