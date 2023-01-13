import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactPendingPaymentsByRangePage } from './contact-pending-payments-by-range.page';

const routes: Routes = [{path: '', component: ContactPendingPaymentsByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactPendingPaymentsByRangeRoutingModule { }
