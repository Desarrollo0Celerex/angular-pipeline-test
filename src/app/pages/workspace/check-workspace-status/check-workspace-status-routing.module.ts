import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckWorkspaceStatusPage } from './check-workspace-status.page';

const routes: Routes = [{ path: '', component: CheckWorkspaceStatusPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckWorkspaceStatusRoutingModule { }
