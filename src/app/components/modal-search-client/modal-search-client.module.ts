import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalSelectClientModule } from '@components/modal-select-client/modal-select-client.module';
import { ModalConfirmAddMemberModule } from '@components/modal-confirm-add-member/modal-confirm-add-member.module';
import { ClientService } from '@services/client.service';
import { GroupMemberService } from '@services/group-member.service';

import { ModalSearchClientComponent } from './modal-search-client.component';

@NgModule({
  declarations: [
    ModalSearchClientComponent
  ],
  exports: [
      ModalSearchClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalSelectClientModule,
    ModalConfirmAddMemberModule
  ],
  providers: [
      ClientService,
      GroupMemberService
  ]
})
export class ModalSearchClientModule { }
