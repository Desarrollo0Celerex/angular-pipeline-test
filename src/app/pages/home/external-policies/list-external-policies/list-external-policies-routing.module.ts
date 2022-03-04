import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListExternalPoliciesPage } from './list-external-policies.page';

const routes: Routes = [{ path: '', component: ListExternalPoliciesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListExternalPoliciesRoutingModule { }
