import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactSourceService } from '@services/contact-source.service';

import { ModalSelectContactSourceComponent } from './modal-select-contact-source.component';
import { ModalSelectContactSourceService } from './modal-select-contact-source.service';

@NgModule({
  declarations: [ModalSelectContactSourceComponent],
  exports: [ModalSelectContactSourceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContactSourceService, ModalSelectContactSourceService]
})
export class ModalSelectContactSourceModule { }
