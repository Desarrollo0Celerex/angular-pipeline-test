import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContainerReportEventModule } from '@components/container-report-event/container-report-event.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { ModalConfirmFinalizeSinisterModule } from '@components/modal-confirm-finalize-sinister/modal-confirm-finalize-sinister.module';
import { ModalConfirmReactivateSinisterModule } from '@components/modal-confirm-reactivate-sinister/modal-confirm-reactivate-sinister.module';
import { ModalUpdateSinisterModule } from '@components/modal-update-sinister/modal-update-sinister.module';
import { ModalUpdateSinisterDetailsModule } from '@components/modal-update-sinister-details/modal-update-sinister-details.module';

import { SinisterService } from '@services/sinister.service';

import { ShowSinisterHistoryRoutingModule } from './show-sinister-history-routing.module';
import { ShowSinisterHistoryPage } from './show-sinister-history.page';


@NgModule({
  declarations: [ShowSinisterHistoryPage],
  imports: [
    CommonModule,
    ContainerPolicyDetailsModule,
    ContainerReportEventModule,
    ContentListModule,
    ModalConfirmFinalizeSinisterModule,
    ModalConfirmReactivateSinisterModule,
    ModalUpdateSinisterModule,
    ModalUpdateSinisterDetailsModule,
    ShowSinisterHistoryRoutingModule
  ],
  providers: [
      SinisterService
  ]
})
export class ShowSinisterHistoryModule { }
