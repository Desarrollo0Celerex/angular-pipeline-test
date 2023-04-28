import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmCreateWorkspaceComponent } from './modal-confirm-create-workspace.component';

@NgModule({
  declarations: [
    ModalConfirmCreateWorkspaceComponent
  ],
  exports: [
      ModalConfirmCreateWorkspaceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmCreateWorkspaceModule { }
