import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContainerPartnerDetailsComponent } from './container-partner-details.component';

import { ContactStatusNameModule } from '@pipes/contact-status-name/contact-status-name.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PartnerService } from '@services/partner.service';

@NgModule({
    declarations: [ContainerPartnerDetailsComponent],
    exports: [ContainerPartnerDetailsComponent],
    imports: [
        CommonModule,
        LoadingContentModule,
        ContactStatusNameModule,
        RouterModule,
    ],
    providers: [PartnerService],
})
export class ContainerPartnerDetailsModule {}
