import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactPendingRenewalsByRangePage } from './contact-pending-renewals-by-range.page';

const routes: Routes = [{path: '', component: ContactPendingRenewalsByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactPendingRenewalsByRangeRoutingModule { }
