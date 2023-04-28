import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalVoiceControlTalkingComponent } from './modal-voice-control-talking.component';

@NgModule({
  declarations: [
    ModalVoiceControlTalkingComponent
  ],
  exports: [
      ModalVoiceControlTalkingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalVoiceControlTalkingModule { }
