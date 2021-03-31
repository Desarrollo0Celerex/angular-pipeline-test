import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { ModalDuplicateContactModule } from '@components/modal-duplicate-contact/modal-duplicate-contact.module';
import { ModalSelectContactSourceModule } from '@components/modal-select-contact-source/modal-select-contact-source.module';
import { ContactService } from '@services/contact.service';
import { ContactSourceService } from '@services/contact-source.service';

import { ContainerCreateContactComponent } from './container-create-contact.component';
import { ContainerCreateContactService } from './container-create-contact.service';

@NgModule({
  declarations: [ContainerCreateContactComponent],
  exports: [ContainerCreateContactComponent],
  imports: [
    CommonModule,
    DropdownSelectPhoneCodeModule,
    FormsModule,
    ReactiveFormsModule,
    ModalDuplicateContactModule,
    ModalSelectContactSourceModule
  ],
  providers: [ContactService, ContainerCreateContactService, ContactSourceService]
})
export class ContainerCreateContactModule { }
