import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowHistoryPolicyPage } from './show-history-policy.page';

const routes: Routes = [{ path: '', component: ShowHistoryPolicyPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowHistoryPolicyRoutingModule { }
