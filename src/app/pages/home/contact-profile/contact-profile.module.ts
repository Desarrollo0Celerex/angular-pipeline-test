import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module'
import { ModalConfirmCreateSinisterModule } from '@components/modal-confirm-create-sinister/modal-confirm-create-sinister.module'
import { ModalSearchContactPolicyModule } from '@components/modal-search-contact-policy/modal-search-contact-policy.module'
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
    ModalCreateSinisterModule,
    ModalConfirmCreateSinisterModule,
    ModalSearchContactPolicyModule,
    PhoneNumberFormatModule
  ],
  providers: [ContactService, ContactProfileService]
})
export class ContactProfileModule { }
