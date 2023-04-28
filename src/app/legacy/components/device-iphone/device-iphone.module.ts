import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceIphoneComponent } from './device-iphone.component';

@NgModule({
  declarations: [
    DeviceIphoneComponent
  ],
  exports: [
    DeviceIphoneComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DeviceIphoneModule { }
