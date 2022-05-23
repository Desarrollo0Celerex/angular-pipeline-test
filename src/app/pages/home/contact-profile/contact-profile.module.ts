import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactAnnualWalletModule } from '@components/card-contact-annual-wallet/card-contact-annual-wallet.module'
import { PhoneNumberFormatModule } from '@pipes/phone-number-format/phone-number-format.module';
import { ContactService } from '@services/contact.service';

import { ContactProfileRoutingModule } from './contact-profile-routing.module';
import { ContactProfilePage } from './contact-profile.page';

@NgModule({
  declarations: [ContactProfilePage],
  imports: [
    CardContactAnnualWalletModule,
    CommonModule,
    ContactProfileRoutingModule,
    PhoneNumberFormatModule
  ],
  providers: [
      ContactService
  ]
})
export class ContactProfileModule { }
