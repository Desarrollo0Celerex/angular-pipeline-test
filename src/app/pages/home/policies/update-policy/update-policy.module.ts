import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardContactModule } from '@components/card-contact/card-contact.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { PolicyService } from '@services/policy.service';

import { UpdatePolicyRoutingModule } from './update-policy-routing.module';
import { UpdatePolicyPage } from './update-policy.page';
import { UpdatePolicyService } from './update-policy.service';

@NgModule({
  declarations: [UpdatePolicyPage],
  imports: [
    CardContactModule,
    CommonModule,
    FormsModule,
    LoadingContentModule,
    ModalSelectFileModule,
    ModalShowPolicyModule,
    ReactiveFormsModule,
    UpdatePolicyRoutingModule
  ],
  providers: [DatePipe, PolicyService, UpdatePolicyService]
})
export class UpdatePolicyModule { }
