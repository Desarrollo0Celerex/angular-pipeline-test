import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';
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
    ModalCreatePartnerModule,
    ContentsModule
  ]
})
export class ListPartnersModule { }
