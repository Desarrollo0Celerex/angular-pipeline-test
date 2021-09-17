import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalCreatePartnerModule } from '@components/modal-create-partner/modal-create-partner.module'

import { ListPartnersRoutingModule } from './list-partners-routing.module';
import { ListPartnersPage } from './list-partners.page';


@NgModule({
  declarations: [
    ListPartnersPage
  ],
  imports: [
    CommonModule,
    ListPartnersRoutingModule,
    ModalCreatePartnerModule
  ]
})
export class ListPartnersModule { }
