import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolicyEndorsementsHistoryPage } from './policy-endorsements-history.page';

const routes: Routes = [{ path: '', component: PolicyEndorsementsHistoryPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyEndorsementsHistoryRoutingModule { }
