import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListIncompletePoliciesPage } from './list-incomplete-policies.page';

const routes: Routes = [{ path: '', component: ListIncompletePoliciesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListIncompletePoliciesRoutingModule { }
