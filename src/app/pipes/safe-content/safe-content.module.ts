import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeContentPipe } from './safe-content.pipe';

@NgModule({
  declarations: [
    SafeContentPipe
  ],
  exports: [
      SafeContentPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SafeContentModule { }
