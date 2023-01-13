import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactReceiptsAppliedByRangePage } from './contact-receipts-applied-by-range.page';

const routes: Routes = [{path: '', component: ContactReceiptsAppliedByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactReceiptsAppliedByRangeRoutingModule { }
