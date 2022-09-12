import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';

import { SinisterService } from '@services/sinister.service';
import { SinisterEventService } from '@services/sinister-event.service';
import { SinisterEventTypeService } from '@services/sinister-event-type.service';

import { ContainerReportEventComponent } from './container-report-event.component';
import { ContainerReportEventService } from './container-report-event.service';

@NgModule({
  declarations: [ContainerReportEventComponent],
  exports: [ContainerReportEventComponent],
  imports: [
    CommonModule,
    DropdownSelectPhoneCodeModule,
    FormsModule,
    ModalSelectEvidenceModule,
    ReactiveFormsModule
  ],
  providers: [ContainerReportEventService, SinisterService, SinisterEventService, SinisterEventTypeService]
})
export class ContainerReportEventModule { }
