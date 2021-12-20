import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListQuotationsByRangePage } from './list-quotations-by-range.page'

const routes: Routes = [{ path: '', component: ListQuotationsByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListQuotationsByRangeRoutingModule { }
