import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactAnnualWalletModule } from '@components/card-contact-annual-wallet/card-contact-annual-wallet.module';
import { ModalConfirmDeleteContactModule } from '@components/modal-confirm-delete-contact/modal-confirm-delete-contact.module';
import { ModalShowContactDetailsModule } from '@components/modal-show-contact-details/modal-show-contact-details.module';
import { PhoneNumberFormatModule } from '@pipes/phone-number-format/phone-number-format.module';
import { ContactService } from '@core/services/contact/contact.service';

import { ContactProfileRoutingModule } from './contact-profile-routing.module';
import { ContactProfilePage } from './contact-profile.page';

@NgModule({
    declarations: [ContactProfilePage],
    imports: [
        CardContactAnnualWalletModule,
        CommonModule,
        ContactProfileRoutingModule,
        ModalConfirmDeleteContactModule,
        ModalShowContactDetailsModule,
        PhoneNumberFormatModule,
    ],
    providers: [ContactService],
})
export class ContactProfileModule {}
