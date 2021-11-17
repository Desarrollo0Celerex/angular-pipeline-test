import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupService } from '@services/group.service';

import { ModalConfirmCreateGroupComponent } from './modal-confirm-create-group.component';

@NgModule({
  declarations: [
    ModalConfirmCreateGroupComponent
  ],
  exports: [
      ModalConfirmCreateGroupComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      GroupService
  ]
})
export class ModalConfirmCreateGroupModule { }
