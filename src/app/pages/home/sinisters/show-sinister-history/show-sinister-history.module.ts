import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerInsuredDetailsModule } from '@components/container-insured-details/container-insured-details.module';
import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContainerReportEventModule } from '@components/container-report-event/container-report-event.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { ModalConfirmFinalizeSinisterModule } from '@components/modal-confirm-finalize-sinister/modal-confirm-finalize-sinister.module';
import { ModalConfirmReactivateSinisterModule } from '@components/modal-confirm-reactivate-sinister/modal-confirm-reactivate-sinister.module';
import { ModalUpdateSinisterCertificateModule } from '@components/modal-update-sinister-certificate/modal-update-sinister-certificate.module';
import { ModalUpdateSinisterDetailsModule } from '@components/modal-update-sinister-details/modal-update-sinister-details.module';
import { ModalUpdateSinisterReportModule } from '@components/modal-update-sinister-report/modal-update-sinister-report.module';
import { WrapperDownloadSinisterEvidenceModule } from '@components/wrapper-download-sinister-evidence/wrapper-download-sinister-evidence.module';
import { WrapperUploadSinisterEvidenceModule } from '@components/wrapper-upload-sinister-evidence/wrapper-upload-sinister-evidence.module';

import { PolicyInsuredService } from '@services/policy-insured.service';
import { SinisterService } from '@services/sinister.service';

import { ShowSinisterHistoryRoutingModule } from './show-sinister-history-routing.module';
import { ShowSinisterHistoryPage } from './show-sinister-history.page';

@NgModule({
  declarations: [ShowSinisterHistoryPage],
  imports: [
    CommonModule,
    ContainerInsuredDetailsModule,
    ContainerPolicyDetailsModule,
    ContainerReportEventModule,
    ContentListModule,
    ModalConfirmFinalizeSinisterModule,
    ModalConfirmReactivateSinisterModule,
    ModalUpdateSinisterCertificateModule,
    ModalUpdateSinisterDetailsModule,
    ModalUpdateSinisterReportModule,
    WrapperDownloadSinisterEvidenceModule,
    WrapperUploadSinisterEvidenceModule,
    ShowSinisterHistoryRoutingModule
  ],
  providers: [
      PolicyInsuredService,
      SinisterService
  ]
})
export class ShowSinisterHistoryModule { }
