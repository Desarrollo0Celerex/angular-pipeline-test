import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleComponent } from './card-content-title.component';

@NgModule({
  declarations: [
    CardContentTitleComponent
  ],
  exports: [
      CardContentTitleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardContentTitleModule { }
