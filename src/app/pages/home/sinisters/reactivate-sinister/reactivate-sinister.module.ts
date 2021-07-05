import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';
import { SinisterService } from '@services/sinister.service';
import { SinisterReactivationService } from '@services/sinister-reactivation.service';

import { ReactivateSinisterRoutingModule } from './reactivate-sinister-routing.module';
import { ReactivateSinisterPage } from './reactivate-sinister.page';
import { ReactivateSinisterService } from './reactivate-sinister.service';

@NgModule({
  declarations: [ReactivateSinisterPage],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    FormsModule,
    ModalSelectEvidenceModule,
    ReactiveFormsModule,
    ReactivateSinisterRoutingModule
  ],
  providers: [ReactivateSinisterService, SinisterService, SinisterReactivationService]
})
export class ReactivateSinisterModule { }
