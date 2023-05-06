import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PluralModule } from '@pipes/plural/plural.module';
import { ClientService } from '@services/client.service';
import { ClientStatusService } from '@services/client-status.service';
import { GroupService } from '@services/group.service';
import { GroupStatusService } from '@services/group-status.service';
import { LeadService } from '@services/lead.service';
import { LeadStatusService } from '@services/lead-status.service';
import { PartnerService } from '@services/partner.service';
import { PartnerStatusService } from '@services/partner-status.service';
import { PaymentService } from '@services/payment.service';
import { PaymentStatusService } from '@services/payment-status.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterStatusService } from '@services/sinister-status.service';

import { ContentKpisComponent } from './content-kpis.component';
import { ContentKpisService } from './content-kpis.service';

@NgModule({
    declarations: [ContentKpisComponent],
    exports: [ContentKpisComponent],
    imports: [CommonModule, RouterModule, PluralModule],
    providers: [
        ClientService,
        ClientStatusService,
        GroupService,
        GroupStatusService,
        ContentKpisService,
        LeadService,
        LeadStatusService,
        PartnerService,
        PartnerStatusService,
        PaymentService,
        PaymentStatusService,
        SinisterService,
        SinisterStatusService,
    ],
})
export class ContentKpisModule {}
