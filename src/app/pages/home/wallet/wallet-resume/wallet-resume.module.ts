import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletResumeRoutingModule } from './wallet-resume-routing.module';
import { WalletResumePage } from './wallet-resume.page';


@NgModule({
  declarations: [
    WalletResumePage
  ],
  imports: [
    CommonModule,
    WalletResumeRoutingModule
  ]
})
export class WalletResumeModule { }
