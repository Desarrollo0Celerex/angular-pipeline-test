import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { AlertScannerFailedComponent } from './alert-scanner-failed.component';

@NgModule({
  declarations: [
    AlertScannerFailedComponent
  ],
  exports: [
    AlertScannerFailedComponent
  ],
  imports: [
    ImageAgenthosAssistantModule,
    CommonModule
  ]
})
export class AlertScannerFailedModule { }
