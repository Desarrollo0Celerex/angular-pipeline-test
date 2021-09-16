import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PluralNameFormatPipe } from '@pipes/plural-name-format/plural-name-format.pipe';

import { InsurerService } from '@services/insurer.service';
import { ContactSourceService } from '@services/contact-source.service';
import { ContactTypeService } from '@services/contact-type.service';
import { LeadStatusService } from '@services/lead-status.service';
import { ClientStatusService } from '@services/client-status.service';
import { PolicySourceService } from '@services/policy-source.service';
import { PolicyStatusService } from '@services/policy-status.service';
import { PaymentStatusService } from '@services/payment-status.service';

import { StatsSnapshotRoutingModule } from './stats-snapshot-routing.module';
import { StatsSnapshotPage } from './stats-snapshot.page';

@NgModule({
  declarations: [
    StatsSnapshotPage
  ],
  imports: [
    CommonModule,
    LoadingContentModule,
    StatsSnapshotRoutingModule
  ],
  providers: [
      PluralNameFormatPipe,
      InsurerService,
      ContactSourceService,
      ContactTypeService,
      LeadStatusService,
      ClientStatusService,
      PolicySourceService,
      PolicyStatusService,
      PaymentStatusService
  ]
})
export class StatsSnapshotModule { }
