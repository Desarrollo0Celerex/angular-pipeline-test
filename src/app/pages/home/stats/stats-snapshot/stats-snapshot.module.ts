import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { InsurerService } from '@services/insurer.service';
import { ContactSourceService } from '@services/contact-source.service';
import { ContactTypeService } from '@services/contact-type.service';
import { LeadStatusService } from '@services/lead-status.service';

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
      InsurerService,
      ContactSourceService,
      ContactTypeService,
      LeadStatusService
  ]
})
export class StatsSnapshotModule { }
