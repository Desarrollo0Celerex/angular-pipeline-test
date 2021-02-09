import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListInsurancesPage } from './list-insurances.page';

const routes: Routes = [{ path: '', component: ListInsurancesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListInsurancesRoutingModule { }
