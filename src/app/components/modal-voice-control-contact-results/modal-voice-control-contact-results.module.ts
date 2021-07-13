import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactStatusNameModule } from '@pipes/contact-status-name/contact-status-name.module';

import { ModalVoiceControlContactResultsComponent } from './modal-voice-control-contact-results.component';

@NgModule({
  declarations: [
    ModalVoiceControlContactResultsComponent
  ],
  exports: [
      ModalVoiceControlContactResultsComponent
  ],
  imports: [
    CommonModule,
    ContactStatusNameModule
  ]
})
export class ModalVoiceControlContactResultsModule { }
