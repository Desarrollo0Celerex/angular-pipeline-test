import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CancelledPoliciesPage } from './cancelled-policies.page';

const routes: Routes = [{ path: '', component: CancelledPoliciesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelledPoliciesRoutingModule { }
