import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardActiveCoveragesModule } from '@components/card-active-coverages/card-active-coverages.module';
import { CardWalletGlobalModule } from '@components/card-wallet-global/card-wallet-global.module';
import { CardWalletProjectionModule } from '@components/card-wallet-projection/card-wallet-projection.module';
import { ModalContactSavedModule } from '@components/modal-contact-saved/modal-contact-saved.module';
import { QuotationService } from '@services/quotation.service';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';
import { ResumeService } from './resume.service';

@NgModule({
  declarations: [ResumePage],
  imports: [
    CardActiveCoveragesModule,
    CardWalletGlobalModule,
    CardWalletProjectionModule,
    CommonModule,
    ModalContactSavedModule,
    ResumeRoutingModule
  ],
  providers: [QuotationService, ResumeService]
})
export class ResumeModule { }
