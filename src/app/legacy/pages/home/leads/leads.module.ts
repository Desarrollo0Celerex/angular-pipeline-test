import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentKpiModule } from '@components/card-content-kpi/card-content-kpi.module';
import { LeadService } from '@services/lead.service';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsLayout } from './leads.layout';

@NgModule({
    declarations: [LeadsLayout],
    imports: [CommonModule, LeadsRoutingModule, CardContentKpiModule],
    providers: [LeadService],
})
export class LeadsModule {}
