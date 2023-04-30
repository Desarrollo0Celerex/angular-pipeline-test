import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContactStatusNamePipe } from './pipes/contact-status-name/contact-status-name.pipe';
import { ContentTypeNamePipe } from './pipes/content-type-name/content-type-name.pipe';
import { CardContentKpiComponent } from './components/card-content-kpi/card-content-kpi.component';
import { PluralPipe } from './pipes/plural/plural.pipe';
import { PaymentStatusNamePipe } from './pipes/payment-status-name/payment-status-name.pipe';
import { PaymentStatusBackgroundPipe } from './pipes/payment-status-background/payment-status-background.pipe';
import { PaymentStatusIconPipe } from './pipes/payment-status-icon/payment-status-icon.pipe';

@NgModule({
    declarations: [
        ContactStatusNamePipe,
        ContentTypeNamePipe,
        CardContentKpiComponent,
        PluralPipe,
        PaymentStatusNamePipe,
        PaymentStatusBackgroundPipe,
        PaymentStatusIconPipe,
    ],
    exports: [
        CardContentKpiComponent,
        ContactStatusNamePipe,
        PaymentStatusNamePipe,
        PluralPipe,
    ],
    imports: [CommonModule, RouterModule],
})
export class SharedModule {}
