import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';

import { ContentMainActionComponent } from './content-main-action.component';

@NgModule({
  declarations: [ContentMainActionComponent],
  exports: [ContentMainActionComponent],
  imports: [
    CommonModule,
    ModalSelectContactTypeModule
  ]
})
export class ContentMainActionModule { }
