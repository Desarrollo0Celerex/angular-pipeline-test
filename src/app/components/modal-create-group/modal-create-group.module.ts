import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalCreateGroupComponent } from './modal-create-group.component';

@NgModule({
  declarations: [
    ModalCreateGroupComponent
  ],
  exports: [
      ModalCreateGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModalCreateGroupModule { }
