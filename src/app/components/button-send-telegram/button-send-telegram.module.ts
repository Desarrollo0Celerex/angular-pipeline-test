import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSendTelegramComponent } from './button-send-telegram.component';

@NgModule({
  declarations: [ButtonSendTelegramComponent],
  exports: [ButtonSendTelegramComponent],
  imports: [
    CommonModule
  ]
})
export class ButtonSendTelegramModule { }
