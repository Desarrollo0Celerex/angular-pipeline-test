import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactAppliedRenewalsByRangePage } from './contact-applied-renewals-by-range.page'

const routes: Routes = [{path: '', component: ContactAppliedRenewalsByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactAppliedRenewalsByRangeRoutingModule { }
