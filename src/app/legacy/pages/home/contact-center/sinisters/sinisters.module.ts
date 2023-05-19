import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModelConfirmSaveWorkspaceDirectoriesModule } from '@components/model-confirm-save-workspace-directories/model-confirm-save-workspace-directories.module';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

import { SinistersRoutingModule } from './sinisters-routing.module';
import { SinistersPage } from './sinisters.page';


@NgModule({
  declarations: [
    SinistersPage
  ],
  imports: [
    CommonModule,
    SinistersRoutingModule,
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
export class SinistersModule { }
