import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WorkspaceService } from '@services/workspace.service';

import { ModalCaptureActivationCodeComponent } from './modal-capture-activation-code.component';

@NgModule({
  declarations: [ModalCaptureActivationCodeComponent],
  exports: [ModalCaptureActivationCodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    WorkspaceService
  ]
})
export class ModalCaptureActivationCodeModule { }
