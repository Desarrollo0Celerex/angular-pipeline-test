import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ModalShowReactivationEvidenceComponent } from './modal-show-reactivation-evidence.component';

@NgModule({
  declarations: [ModalShowReactivationEvidenceComponent],
  exports: [ModalShowReactivationEvidenceComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class ModalShowReactivationEvidenceModule { }
