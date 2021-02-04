import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentMainActionComponent } from './content-main-action.component';

@NgModule({
  declarations: [ContentMainActionComponent],
  exports: [ContentMainActionComponent],
  imports: [
    CommonModule
  ]
})
export class ContentMainActionModule { }
