import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';

import { CreateWorkspaceRoutingModule } from './create-workspace-routing.module';
import { CreateWorkspacePage } from './create-workspace.page';
import { CreateWorkspaceService } from './create-workspace.service';


@NgModule({
  declarations: [CreateWorkspacePage],
  imports: [
    CommonModule,
    CreateWorkspaceRoutingModule,
    DropdownSelectPhoneCodeModule
  ],
  providers: [CreateWorkspaceService]
})
export class CreateWorkspaceModule { }
