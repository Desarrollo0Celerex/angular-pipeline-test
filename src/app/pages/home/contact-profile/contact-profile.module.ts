import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumberFormatModule } from '@pipes/phone-number-format/phone-number-format.module';
import { ContactService } from '@services/contact.service';

import { ContactProfileRoutingModule } from './contact-profile-routing.module';
import { ContactProfilePage } from './contact-profile.page';
import { ContactProfileService } from './contact-profile.service';

@NgModule({
  declarations: [ContactProfilePage],
  imports: [
    CommonModule,
    ContactProfileRoutingModule,
    PhoneNumberFormatModule
  ],
  providers: [ContactService, ContactProfileService]
})
export class ContactProfileModule { }
