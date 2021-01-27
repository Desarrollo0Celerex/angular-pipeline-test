import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';

import { WorkspaceService } from '@services/workspace.service';

import { UploadWorkspaceAvatarRoutingModule } from './upload-workspace-avatar-routing.module';
import { UploadWorkspaceAvatarPage } from './upload-workspace-avatar.page';
import { UploadWorkspaceAvatarService } from './upload-workspace-avatar.service';

@NgModule({
  declarations: [UploadWorkspaceAvatarPage],
  imports: [
    CommonModule,
    UploadWorkspaceAvatarRoutingModule,
    ImageCropperModule
  ],
  providers: [UploadWorkspaceAvatarService, WorkspaceService]
})
export class UploadWorkspaceAvatarModule { }
