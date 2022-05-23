import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module'
import { ModalConfirmCreateSinisterModule } from '@components/modal-confirm-create-sinister/modal-confirm-create-sinister.module'
import { ModalSearchContactPolicyModule } from '@components/modal-search-contact-policy/modal-search-contact-policy.module'
import { ContactService } from '@services/contact.service';

import { CardContactAnnualWalletComponent } from './card-contact-annual-wallet.component';

@NgModule({
  declarations: [
    CardContactAnnualWalletComponent
  ],
  exports: [
      CardContactAnnualWalletComponent
  ],
  imports: [
    CommonModule,
    ModalCreateSinisterModule,
    ModalConfirmCreateSinisterModule,
    ModalSearchContactPolicyModule,
    LoadingContentModule
  ],
  providers: [
      ContactService
  ]
})
export class CardContactAnnualWalletModule { }
