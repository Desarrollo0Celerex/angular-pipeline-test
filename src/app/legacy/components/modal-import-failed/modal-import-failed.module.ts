import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalImportFailedComponent } from './modal-import-failed.component';

@NgModule({
  declarations: [
    ModalImportFailedComponent
  ],
  exports: [
    ModalImportFailedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalImportFailedModule { }
