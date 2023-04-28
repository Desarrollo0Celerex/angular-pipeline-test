import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSendEmailComponent } from './button-send-email.component';
import { ButtonSendEmailService } from './button-send-email.service';

@NgModule({
  declarations: [ButtonSendEmailComponent],
  exports: [ButtonSendEmailComponent],
  imports: [
    CommonModule
  ],
  providers: [ButtonSendEmailService]
})
export class ButtonSendEmailModule { }
