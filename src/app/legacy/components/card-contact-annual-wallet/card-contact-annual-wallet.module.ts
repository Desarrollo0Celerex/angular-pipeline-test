import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module';
import { ModalConfirmCreateSinisterModule } from '@components/modal-confirm-create-sinister/modal-confirm-create-sinister.module';
import { ModalSearchContactPolicyModule } from '@components/modal-search-contact-policy/modal-search-contact-policy.module';
import { ModalSelectContactSourceModule } from '@components/modal-select-contact-source/modal-select-contact-source.module';
import { ContactService } from '@core/services/contact/contact.service';

import { CardContactAnnualWalletComponent } from './card-contact-annual-wallet.component';

@NgModule({
    declarations: [CardContactAnnualWalletComponent],
    exports: [CardContactAnnualWalletComponent],
    imports: [
        CommonModule,
        ModalCreateSinisterModule,
        ModalConfirmCreateSinisterModule,
        ModalSearchContactPolicyModule,
        ModalSelectContactSourceModule,
        LoadingContentModule,
    ],
    providers: [ContactService],
})
export class CardContactAnnualWalletModule {}
