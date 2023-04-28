import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpeechRecognitionModule } from '@components/speech-recognition/speech-recognition.module'
import { WorkspaceUserService } from '@services/workspace-user.service';

import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    SpeechRecognitionModule
  ],
  providers: [HeaderService, WorkspaceUserService]
})
export class HeaderModule { }
