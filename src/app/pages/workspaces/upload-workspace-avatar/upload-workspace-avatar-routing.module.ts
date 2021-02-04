import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadWorkspaceAvatarPage } from './upload-workspace-avatar.page';

const routes: Routes = [{ path: '', component: UploadWorkspaceAvatarPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadWorkspaceAvatarRoutingModule { }
