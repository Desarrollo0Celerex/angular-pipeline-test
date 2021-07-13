import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalVoiceControlNotSupportedComponent } from './modal-voice-control-not-supported.component';

@NgModule({
  declarations: [
    ModalVoiceControlNotSupportedComponent
  ],
  exports: [
     ModalVoiceControlNotSupportedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalVoiceControlNotSupportedModule { }
