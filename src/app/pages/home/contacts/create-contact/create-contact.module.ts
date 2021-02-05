import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { ModalSelectContactSourceModule } from '@components/modal-select-contact-source/modal-select-contact-source.module';
import { ContactService } from '@services/contact.service';
import { ContactSourceService } from '@services/contact-source.service';

import { CreateContactRoutingModule } from './create-contact-routing.module';
import { CreateContactPage } from './create-contact.page';
import { CreateContactService } from './create-contact.service';


@NgModule({
  declarations: [CreateContactPage],
  imports: [
    CommonModule,
    CreateContactRoutingModule,
    DropdownSelectPhoneCodeModule,
    FormsModule,
    ModalSelectContactSourceModule,
    ReactiveFormsModule
  ],
  providers: [ContactService, ContactSourceService, CreateContactService]
})
export class CreateContactModule { }
