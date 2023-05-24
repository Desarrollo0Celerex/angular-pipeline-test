import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerReceiptsPendingByRangePage } from './partner-receipts-pending-by-range.page'
const routes: Routes = [{path: '', component: PartnerReceiptsPendingByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerReceiptsPendingByRangeRoutingModule { }
