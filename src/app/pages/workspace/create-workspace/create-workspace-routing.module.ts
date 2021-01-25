import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateWorkspacePage } from './create-workspace.page';

const routes: Routes = [{ path: '', component: CreateWorkspacePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateWorkspaceRoutingModule { }
