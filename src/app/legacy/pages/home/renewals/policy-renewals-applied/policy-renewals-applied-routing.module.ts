import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolicyRenewalsAppliedPage } from './policy-renewals-applied.page';

const routes: Routes = [{ path: '', component: PolicyRenewalsAppliedPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRenewalsAppliedRoutingModule { }
