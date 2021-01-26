import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { CountryService } from '@services/country.service';
import { StateService } from '@services/state.service';

import { CreateWorkspaceRoutingModule } from './create-workspace-routing.module';
import { CreateWorkspacePage } from './create-workspace.page';
import { CreateWorkspaceService } from './create-workspace.service';


@NgModule({
  declarations: [CreateWorkspacePage],
  imports: [
    CommonModule,
    CreateWorkspaceRoutingModule,
    DropdownSelectPhoneCodeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CountryService, CreateWorkspaceService, StateService]
})
export class CreateWorkspaceModule { }
