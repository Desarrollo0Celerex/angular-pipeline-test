import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalWorkspaceUserNotFoundComponent } from './modal-workspace-user-not-found.component';

@NgModule({
  declarations: [
    ModalWorkspaceUserNotFoundComponent
  ],
  exports: [
      ModalWorkspaceUserNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalWorkspaceUserNotFoundModule { }
