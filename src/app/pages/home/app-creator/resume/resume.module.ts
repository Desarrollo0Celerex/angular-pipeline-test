import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletService } from '@services/wallet.service';

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
    WalletService
  ]
})
export class ResumeModule { }
