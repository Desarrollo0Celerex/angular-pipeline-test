import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspacePoliciesPendingPage } from './workspace-policies-pending.page'

const routes: Routes = [{ path: '', component: WorkspacePoliciesPendingPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacePoliciesPendingRoutingModule { }
