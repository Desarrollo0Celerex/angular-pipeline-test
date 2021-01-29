import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorkspaceService } from '@services/workspace.service';

import { ContainerShowWorkspaceInfoComponent } from './container-show-workspace-info.component';
import { ContainerShowWorkspaceInfoService } from './container-show-workspace-info.service';

@NgModule({
  declarations: [ContainerShowWorkspaceInfoComponent],
  exports: [ContainerShowWorkspaceInfoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [ContainerShowWorkspaceInfoService, WorkspaceService]
})
export class ContainerShowWorkspaceInfoModule { }
