import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSendTelegramComponent } from './button-send-telegram.component';
import { ButtonSendTelegramService } from './button-send-telegram.service';

@NgModule({
  declarations: [ButtonSendTelegramComponent],
  exports: [ButtonSendTelegramComponent],
  imports: [
    CommonModule
  ],
  providers: [ButtonSendTelegramService]
})
export class ButtonSendTelegramModule { }
