import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentListModule } from '@components/content-list/content-list.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';


@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    CommonModule,
    ContentListModule,
    ResumeRoutingModule
  ]
})
export class ResumeModule { }
