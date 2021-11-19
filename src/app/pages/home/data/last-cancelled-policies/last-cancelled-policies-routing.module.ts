import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LastCancelledPoliciesPage } from './last-cancelled-policies.page';

const routes: Routes = [{ path: '', component: LastCancelledPoliciesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastCancelledPoliciesRoutingModule { }
