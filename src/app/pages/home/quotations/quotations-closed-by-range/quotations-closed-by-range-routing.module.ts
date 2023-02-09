import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuotationsClosedByRangePage } from './quotations-closed-by-range.page';

const routes: Routes = [{ path: '', component: QuotationsClosedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationsClosedByRangeRoutingModule { }
