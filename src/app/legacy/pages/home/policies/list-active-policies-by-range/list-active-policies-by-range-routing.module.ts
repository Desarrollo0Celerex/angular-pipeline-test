import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListActivePoliciesByRangePage } from './list-active-policies-by-range.page';

const routes: Routes = [{ path: '', component: ListActivePoliciesByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListActivePoliciesByRangeRoutingModule { }
