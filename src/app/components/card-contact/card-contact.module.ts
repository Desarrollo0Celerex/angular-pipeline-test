import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactStatusNameModule } from '@pipes/contact-status-name/contact-status-name.module';

import { CardContactComponent } from './card-contact.component';

@NgModule({
  declarations: [CardContactComponent],
  exports: [CardContactComponent],
  imports: [
    CommonModule,
    ContactStatusNameModule
  ]
})
export class CardContactModule { }
