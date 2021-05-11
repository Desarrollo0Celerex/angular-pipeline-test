import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalContactSavedModule } from '@components/modal-contact-saved/modal-contact-saved.module';
import { QuotationService } from '@services/quotation.service';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';
import { ResumeService } from './resume.service';

@NgModule({
  declarations: [ResumePage],
  imports: [
    CommonModule,
    ModalContactSavedModule,
    ResumeRoutingModule
  ],
  providers: [QuotationService, ResumeService]
})
export class ResumeModule { }
