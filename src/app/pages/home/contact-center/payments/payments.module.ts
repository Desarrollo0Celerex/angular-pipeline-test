import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModelConfirmSaveWorkspaceDirectoriesModule } from '@components/model-confirm-save-workspace-directories/model-confirm-save-workspace-directories.module';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsPage } from './payments.page';

@NgModule({
  declarations: [
    PaymentsPage
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingContentModule,
    DropdownSelectPhoneCodeModule,
    ModelConfirmSaveWorkspaceDirectoriesModule,
  ],
  providers: [
    WorkspaceDirectoryService
  ]
})
export class PaymentsModule { }
