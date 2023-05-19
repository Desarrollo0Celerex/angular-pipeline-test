import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceMacbookProComponent } from './device-macbook-pro.component';

@NgModule({
  declarations: [
    DeviceMacbookProComponent
  ],
  exports: [
    DeviceMacbookProComponent
  ],
  imports: [
    CommonModule
  ],
})
export class DeviceMacbookProModule { }
