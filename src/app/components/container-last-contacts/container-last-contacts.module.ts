import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactModule } from '@components/card-contact/card-contact.module';
import { ModalShowContactDataModule } from '@components/modal-show-contact-data/modal-show-contact-data.module';

import { ContainerLastContactsComponent } from './container-last-contacts.component';

@NgModule({
  declarations: [
    ContainerLastContactsComponent
  ],
  exports: [
      ContainerLastContactsComponent
  ],
  imports: [
    CardContactModule,
    CommonModule,
    ModalShowContactDataModule
  ]
})
export class ContainerLastContactsModule { }
