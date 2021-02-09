import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDoCallComponent } from './button-do-call.component';

@NgModule({
  declarations: [ButtonDoCallComponent],
  exports: [ButtonDoCallComponent],
  imports: [
    CommonModule
  ]
})
export class ButtonDoCallModule { }
