import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalVoiceControlCommandNotFoundComponent } from './modal-voice-control-command-not-found.component';

@NgModule({
  declarations: [
    ModalVoiceControlCommandNotFoundComponent
  ],
  exports: [
      ModalVoiceControlCommandNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalVoiceControlCommandNotFoundModule { }
