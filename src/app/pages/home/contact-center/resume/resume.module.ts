import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  providers: [ResumeService]
})
export class ResumeModule { }
