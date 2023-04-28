import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolicyRenewalHistoryPage } from './policy-renewal-history.page';

const routes: Routes = [{ path: '', component: PolicyRenewalHistoryPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRenewalHistoryRoutingModule { }
