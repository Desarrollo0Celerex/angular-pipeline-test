import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module'
import { ModalConfirmPolicyInsuredsModule } from '@components/modal-confirm-policy-insureds/modal-confirm-policy-insureds.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { PolicyInsuredService } from '@services/policy-insured.service';

import { ImportPolicyInsuredsRoutingModule } from './import-policy-insureds-routing.module';
import { ImportPolicyInsuredsPage } from './import-policy-insureds.page';


@NgModule({
  declarations: [
    ImportPolicyInsuredsPage
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    ImportPolicyInsuredsRoutingModule,
    ModalConfirmPolicyInsuredsModule,
    ModalSelectFileModule
  ],
  providers: [
    PolicyInsuredService
  ]
})
export class ImportPolicyInsuredsModule { }
