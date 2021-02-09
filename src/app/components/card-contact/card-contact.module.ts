import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactService } from '@services/contact.service';

import { CardContactComponent } from './card-contact.component';
import { CardContactService } from './card-contact.service';

@NgModule({
  declarations: [CardContactComponent],
  exports: [CardContactComponent],
  imports: [
    CommonModule
  ],
  providers: [CardContactService, ContactService]
})
export class CardContactModule { }
