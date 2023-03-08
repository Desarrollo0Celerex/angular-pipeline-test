import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { SiteService } from '@services/site.service';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';
import { ResumeService } from './resume.service';


@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    CommonModule,
    LoadingContentModule,
    ResumeRoutingModule
  ],
  providers: [
    ResumeService,
    SiteService
  ]
})
export class ResumeModule { }
