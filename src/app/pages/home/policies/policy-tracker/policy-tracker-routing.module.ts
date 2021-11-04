import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolicyTrackerPage } from './policy-tracker.page';

const routes: Routes = [{ path: '', component: PolicyTrackerPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyTrackerRoutingModule { }
