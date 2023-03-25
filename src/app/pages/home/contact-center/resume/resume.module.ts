import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';
import { ResumeService } from './resume.service';

@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule
  ],
  providers: [
    ResumeService,
    WorkspaceDirectoryService
  ]
})
export class ResumeModule { }
