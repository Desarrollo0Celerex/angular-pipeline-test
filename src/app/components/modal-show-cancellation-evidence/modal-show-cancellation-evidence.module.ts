import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { CancelledPolicyService } from '@services/cancelled-policy.service';

import { ModalShowCancellationEvidenceComponent } from './modal-show-cancellation-evidence.component';

@NgModule({
  declarations: [ModalShowCancellationEvidenceComponent],
  exports: [ModalShowCancellationEvidenceComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ],
  providers: [CancelledPolicyService]
})
export class ModalShowCancellationEvidenceModule { }
