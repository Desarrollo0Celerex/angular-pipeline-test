import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerTimelineModule } from '@components/container-timeline/container-timeline.module';

import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
import { PaymentHistoryPage } from './payment-history.page';


@NgModule({
  declarations: [PaymentHistoryPage],
  imports: [
    CommonModule,
    ContainerTimelineModule,
    PaymentHistoryRoutingModule
  ]
})
export class PaymentHistoryModule { }
