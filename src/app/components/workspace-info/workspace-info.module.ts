import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorkspaceService } from '@services/workspace.service';

import { WorkspaceInfoComponent } from './workspace-info.component';
import { WorkspaceInfoService } from './workspace-info.service';

@NgModule({
  declarations: [WorkspaceInfoComponent],
  exports: [WorkspaceInfoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [WorkspaceInfoService, WorkspaceService]
})
export class WorkspaceInfoModule { }
