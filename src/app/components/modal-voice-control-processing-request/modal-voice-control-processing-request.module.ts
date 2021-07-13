import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalVoiceControlProcessingRequestComponent } from './modal-voice-control-processing-request.component';

@NgModule({
  declarations: [
    ModalVoiceControlProcessingRequestComponent
  ],
  exports: [
      ModalVoiceControlProcessingRequestComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalVoiceControlProcessingRequestModule { }
