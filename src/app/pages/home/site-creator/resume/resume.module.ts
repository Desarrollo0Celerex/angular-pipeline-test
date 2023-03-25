import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceMacbookProSiteModule } from '@components/device-macbook-pro-site/device-macbook-pro-site.module';
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
    DeviceMacbookProSiteModule,
    LoadingContentModule,
    ResumeRoutingModule
  ],
  providers: [
    ResumeService,
    SiteService
  ]
})
export class ResumeModule { }
