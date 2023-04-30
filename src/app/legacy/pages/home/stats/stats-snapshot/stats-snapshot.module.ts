import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { MenuStatsModule } from '@components/menu-stats/menu-stats.module';
import { PluralPipe } from '@shared/pipes/plural/plural.pipe';

import { InsurerService } from '@services/insurer.service';
import { ContactSourceService } from '@services/contact-source.service';
import { ContactTypeService } from '@services/contact-type.service';
import { LeadStatusService } from '@services/lead-status.service';
import { ClientStatusService } from '@services/client-status.service';
import { PolicySourceService } from '@services/policy-source.service';
import { PolicyStatusService } from '@services/policy-status.service';
import { PaymentService } from '@services/payment.service';
import { PaymentStatusService } from '@services/payment-status.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterStatusService } from '@services/sinister-status.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { StatsSnapshotRoutingModule } from './stats-snapshot-routing.module';
import { StatsSnapshotPage } from './stats-snapshot.page';

@NgModule({
    declarations: [StatsSnapshotPage],
    imports: [
        CommonModule,
        LoadingContentModule,
        StatsSnapshotRoutingModule,
        MenuStatsModule,
    ],
    providers: [
        PluralPipe,
        InsurerService,
        ContactSourceService,
        ContactTypeService,
        LeadStatusService,
        ClientStatusService,
        PolicySourceService,
        PolicyStatusService,
        PaymentService,
        PaymentStatusService,
        SinisterService,
        SinisterStatusService,
        WorkspaceService,
    ],
})
export class StatsSnapshotModule {}
