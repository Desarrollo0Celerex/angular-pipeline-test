import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { CurrencyService } from '@services/currency.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterResolutionService } from '@services/sinister-resolution.service';

import { FinalizeSinisterRoutingModule } from './finalize-sinister-routing.module';
import { FinalizeSinisterPage } from './finalize-sinister.page';
import { FinalizeSinisterService } from './finalize-sinister.service';

@NgModule({
  declarations: [FinalizeSinisterPage],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    FinalizeSinisterRoutingModule,
    FormsModule,
    ModalSelectFileModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyService, FinalizeSinisterService, SinisterService, SinisterResolutionService]
})
export class FinalizeSinisterModule { }
