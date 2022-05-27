import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPartnerAnnualWalletModule } from '@components/card-partner-annual-wallet/card-partner-annual-wallet.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmDeletePartnerModule } from '@components/modal-confirm-delete-partner/modal-confirm-delete-partner.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalShowPartnerDetailsModule } from '@components/modal-show-partner-details/modal-show-partner-details.module';
import { ModalUpdatePartnerModule } from '@components/modal-update-partner/modal-update-partner.module';
import { PartnerService } from '@services/partner.service';

import { PartnerProfileRoutingModule } from './partner-profile-routing.module';
import { PartnerProfileLayout } from './partner-profile.layout';

@NgModule({
  declarations: [
    PartnerProfileLayout
  ],
  imports: [
    CardPartnerAnnualWalletModule,
    CommonModule,
    LoadingContentModule,
    ModalConfirmDeletePartnerModule,
    ModalSelectContactTypeModule,
    ModalShowPartnerDetailsModule,
    ModalUpdatePartnerModule,
    PartnerProfileRoutingModule
  ],
  providers: [
      PartnerService
  ]
})
export class PartnerProfileModule { }
