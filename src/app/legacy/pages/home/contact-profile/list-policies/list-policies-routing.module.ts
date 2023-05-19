import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPoliciesPage } from './list-policies.page';

const routes: Routes = [{ path: '', component: ListPoliciesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPoliciesRoutingModule { }
