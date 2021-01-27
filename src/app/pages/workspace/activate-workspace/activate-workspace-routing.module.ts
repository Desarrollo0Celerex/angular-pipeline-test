import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivateWorkspacePage } from './activate-workspace.page';

const routes: Routes = [{ path: '', component: ActivateWorkspacePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateWorkspaceRoutingModule { }
