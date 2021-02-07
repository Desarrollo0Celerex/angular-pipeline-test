import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalContactSavedModule } from '@components/modal-contact-saved/modal-contact-saved.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';


@NgModule({
  declarations: [ResumePage],
  imports: [
    CommonModule,
    ModalContactSavedModule,
    ResumeRoutingModule
  ]
})
export class ResumeModule { }
