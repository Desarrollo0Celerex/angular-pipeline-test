import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardContentKpiComponent } from './components/card-content-kpi/card-content-kpi.component';
import { CardContentTitleComponent } from './components/card-content-title/card-content-title.component';
import { ContactStatusNamePipe } from './pipes/contact-status-name/contact-status-name.pipe';
import { ContentTypeNamePipe } from './pipes/content-type-name/content-type-name.pipe';
import { PluralPipe } from './pipes/plural/plural.pipe';
import { PaymentStatusNamePipe } from './pipes/payment-status-name/payment-status-name.pipe';
import { PaymentStatusBackgroundPipe } from './pipes/payment-status-background/payment-status-background.pipe';
import { PaymentStatusIconPipe } from './pipes/payment-status-icon/payment-status-icon.pipe';

@NgModule({
    declarations: [
        CardContentKpiComponent,
        CardContentTitleComponent,
        ContactStatusNamePipe,
        ContentTypeNamePipe,
        PaymentStatusBackgroundPipe,
        PaymentStatusIconPipe,
        PaymentStatusNamePipe,
        PluralPipe,
    ],
    exports: [
        CardContentKpiComponent,
        CardContentTitleComponent,
        ContactStatusNamePipe,
        ContentTypeNamePipe,
        PaymentStatusNamePipe,
        PluralPipe,
    ],
    imports: [CommonModule, RouterModule],
})
export class SharedModule {}
