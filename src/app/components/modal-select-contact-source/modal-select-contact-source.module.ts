import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactSourceService } from '@services/contact-source.service';
import { ContactSourceTypeService } from '@services/contact-source-type.service';

import { ModalSelectContactSourceComponent } from './modal-select-contact-source.component';

@NgModule({
  declarations: [ModalSelectContactSourceComponent],
  exports: [ModalSelectContactSourceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      ContactSourceService,
      ContactSourceTypeService
  ]
})
export class ModalSelectContactSourceModule { }
