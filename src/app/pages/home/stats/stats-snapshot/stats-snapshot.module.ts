import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { InsurerService } from '@services/insurer.service';

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
      InsurerService
  ]
})
export class StatsSnapshotModule { }
