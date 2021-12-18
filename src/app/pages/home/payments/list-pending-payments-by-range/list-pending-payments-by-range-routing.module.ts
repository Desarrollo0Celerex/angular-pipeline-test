import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPendingPaymentsByRangePage } from './list-pending-payments-by-range.page';

const routes: Routes = [{ path: '', component: ListPendingPaymentsByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPendingPaymentsByRangeRoutingModule { }
