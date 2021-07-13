import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactService } from '@services/contact.service';

import { SpeechRecognitionComponent } from './speech-recognition.component';

@NgModule({
  declarations: [
    SpeechRecognitionComponent
  ],
  exports: [SpeechRecognitionComponent],
  imports: [
    CommonModule
  ],
  providers: [
      ContactService
  ]
})
export class SpeechRecognitionModule { }
