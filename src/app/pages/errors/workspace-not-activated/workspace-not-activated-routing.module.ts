import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceNotActivatedPage } from './workspace-not-activated.page';

const routes: Routes = [{ path: '', component: WorkspaceNotActivatedPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceNotActivatedRoutingModule { }
