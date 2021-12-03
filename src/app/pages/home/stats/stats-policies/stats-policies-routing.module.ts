import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsPoliciesPage } from './stats-policies.page';

const routes: Routes = [{ path: '', component: StatsPoliciesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsPoliciesRoutingModule { }
