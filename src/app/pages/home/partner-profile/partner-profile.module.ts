import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { PartnerService } from '@services/partner.service';

import { PartnerProfileRoutingModule } from './partner-profile-routing.module';
import { PartnerProfileLayout } from './partner-profile.layout';

@NgModule({
  declarations: [
    PartnerProfileLayout
  ],
  imports: [
    CommonModule,
    LoadingContentModule,
    ModalSelectContactTypeModule,
    PartnerProfileRoutingModule
  ],
  providers: [
      PartnerService
  ]
})
export class PartnerProfileModule { }
