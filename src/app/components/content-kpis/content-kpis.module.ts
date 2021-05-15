import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';
import { ClientService } from '@services/client.service';
import { ClientStatusService } from '@services/client-status.service';
import { LeadService } from '@services/lead.service';
import { LeadStatusService } from '@services/lead-status.service';
import { PaymentService } from '@services/payment.service';
import { PaymentStatusService } from '@services/payment-status.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterStatusService } from '@services/sinister-status.service';

import { ContentKpisComponent } from './content-kpis.component';
import { ContentKpisService } from './content-kpis.service';

@NgModule({
  declarations: [ContentKpisComponent],
  exports: [ContentKpisComponent],
  imports: [
    CommonModule,
    PluralNameFormatModule,
    RouterModule
  ],
  providers: [ClientService, ClientStatusService, ContentKpisService, LeadService, LeadStatusService, PaymentService, PaymentStatusService, SinisterService, SinisterStatusService]
})
export class ContentKpisModule { }
