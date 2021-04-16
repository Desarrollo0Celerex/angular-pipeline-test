import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanningComponent } from './scanning.component';

@NgModule({
  declarations: [ScanningComponent],
  exports: [ScanningComponent],
  imports: [
    CommonModule
  ]
})
export class ScanningModule { }
