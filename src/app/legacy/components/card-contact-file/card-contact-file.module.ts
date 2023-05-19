import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactFileComponent } from './card-contact-file.component';

@NgModule({
  declarations: [CardContactFileComponent],
  exports: [CardContactFileComponent],
  imports: [
    CommonModule
  ]
})
export class CardContactFileModule { }
