import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContentsModule } from '@components/contents/contents.module';
import { ModalSelectPolicyInsuredUploadTypeModule } from '@components/modal-select-policy-insured-upload-type/modal-select-policy-insured-upload-type.module';
import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module';
import { ModalShowPolicyInsuredActionsModule } from '@components/modal-show-policy-insured-actions/modal-show-policy-insured-actions.module';
import { PolicyInsuredService } from '@services/policy-insured.service';

import { ListPolicyInsuredsRoutingModule } from './list-policy-insureds-routing.module';
import { ListPolicyInsuredsPage } from './list-policy-insureds.page';

@NgModule({
  declarations: [
    ListPolicyInsuredsPage
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    ContentsModule,
    ListPolicyInsuredsRoutingModule,
    ModalSelectPolicyInsuredUploadTypeModule,
    ModalSelectReportFormatModule,
    ModalShowPolicyInsuredActionsModule
  ],
  providers: [
    PolicyInsuredService
  ]
})
export class ListPolicyInsuredsModule { }
