import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayTracketRoutingModule } from './pay-tracker-routing.module';
import { PaymentListPage } from './pages/payment-list/payment-list.page';

@NgModule({
    declarations: [PaymentListPage],
    imports: [CommonModule, PayTracketRoutingModule],
})
export class PayTracketModule {}
