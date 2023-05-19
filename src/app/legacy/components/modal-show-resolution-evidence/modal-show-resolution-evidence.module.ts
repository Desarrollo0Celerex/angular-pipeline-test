import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ModalShowResolutionEvidenceComponent } from './modal-show-resolution-evidence.component';

@NgModule({
  declarations: [ModalShowResolutionEvidenceComponent],
  exports: [ModalShowResolutionEvidenceComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class ModalShowResolutionEvidenceModule { }
