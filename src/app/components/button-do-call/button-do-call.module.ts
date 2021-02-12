import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDoCallComponent } from './button-do-call.component';
import { ButtonDoCallService } from './button-do-call.service';

@NgModule({
  declarations: [ButtonDoCallComponent],
  exports: [ButtonDoCallComponent],
  imports: [
    CommonModule
  ],
  providers: [ButtonDoCallService]
})
export class ButtonDoCallModule { }
