import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalUploadPolicyEndorsementComponent } from './modal-upload-policy-endorsement.component';
import { ModalUploadPolicyEndorsementService } from './modal-upload-policy-endorsement.service';

@NgModule({
  declarations: [ModalUploadPolicyEndorsementComponent],
  exports: [ModalUploadPolicyEndorsementComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalUploadPolicyEndorsementService]
})
export class ModalUploadPolicyEndorsementModule { }
