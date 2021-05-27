import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContainerReportEventService, SinisterService, SinisterEventService, SinisterEventTypeService]
})
export class ContainerReportEventModule { }
