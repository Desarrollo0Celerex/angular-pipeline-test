import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSendEmailComponent } from './button-send-email.component';

@NgModule({
  declarations: [ButtonSendEmailComponent],
  exports: [ButtonSendEmailComponent],
  imports: [
    CommonModule
  ]
})
export class ButtonSendEmailModule { }
