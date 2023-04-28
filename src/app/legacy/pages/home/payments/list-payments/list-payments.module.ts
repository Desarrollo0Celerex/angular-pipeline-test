import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListPaymentsRoutingModule } from './list-payments-routing.module';
import { ListPaymentsPage } from './list-payments.page';

@NgModule({
  declarations: [ListPaymentsPage],
  imports: [
    CommonModule,
    ContentsModule,
    ListPaymentsRoutingModule
  ]
})
export class ListPaymentsModule { }
