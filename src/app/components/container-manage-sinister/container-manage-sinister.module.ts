import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmFinalizeSinisterModule } from '@components/modal-confirm-finalize-sinister/modal-confirm-finalize-sinister.module';
import { ModalConfirmReactivateSinisterModule } from '@components/modal-confirm-reactivate-sinister/modal-confirm-reactivate-sinister.module';
import { ModalUpdateSinisterModule } from '@components/modal-update-sinister/modal-update-sinister.module';
import { SinisterService } from '@services/sinister.service';

import { ContainerManageSinisterComponent } from './container-manage-sinister.component';
import { ContainerManageSinisterService } from './container-manage-sinister.service';

@NgModule({
  declarations: [ContainerManageSinisterComponent],
  exports: [ContainerManageSinisterComponent],
  imports: [
    CommonModule,
    ModalConfirmFinalizeSinisterModule,
    ModalConfirmReactivateSinisterModule,
    ModalUpdateSinisterModule
  ],
  providers: [ContainerManageSinisterService, SinisterService]
})
export class ContainerManageSinisterModule { }
