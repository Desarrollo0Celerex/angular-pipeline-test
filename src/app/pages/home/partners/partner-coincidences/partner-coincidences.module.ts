import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentListModule } from '@components/content-list/content-list.module';
import { ModalConfirmCreatePartnerModule } from '@components/modal-confirm-create-partner/modal-confirm-create-partner.module';

import { PartnerCoincidencesRoutingModule } from './partner-coincidences-routing.module';
import { PartnerCoincidencesPage } from './partner-coincidences.page';


@NgModule({
  declarations: [
    PartnerCoincidencesPage
  ],
  imports: [
    CommonModule,
    PartnerCoincidencesRoutingModule,
    ContentListModule,
    ModalConfirmCreatePartnerModule
  ]
})
export class PartnerCoincidencesModule { }
