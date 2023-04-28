import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalVoiceControlNoResultsComponent } from './modal-voice-control-no-results.component';

@NgModule({
  declarations: [
    ModalVoiceControlNoResultsComponent
  ],
  exports: [
      ModalVoiceControlNoResultsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalVoiceControlNoResultsModule { }
