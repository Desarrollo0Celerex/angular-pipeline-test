import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListOpenedSinistersByRangePage } from './list-opened-sinisters-by-range.page';

const routes: Routes = [{ path: '', component: ListOpenedSinistersByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOpenedSinistersByRangeRoutingModule { }
