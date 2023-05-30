import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentKpiModule } from '@components/card-content-kpi/card-content-kpi.module';
import { LeadService } from '@services/lead.service';
import { ClientService } from '@services/client.service';
import { PaymentService } from '@services/payment.service';
import { SinisterService } from '@services/sinister.service';

import { ContainerGlobalKpisComponent } from './container-global-kpis.component';

@NgModule({
    declarations: [ContainerGlobalKpisComponent],
    exports: [ContainerGlobalKpisComponent],
    imports: [CommonModule, CardContentKpiModule],
    providers: [LeadService, ClientService, SinisterService, PaymentService],
})
export class ContainerGlobalKpisModule {}
