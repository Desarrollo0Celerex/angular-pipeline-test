import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardContentKpiComponent } from './components/card-content-kpi/card-content-kpi.component';
import { CardContentTitleComponent } from './components/card-content-title/card-content-title.component';
import { ContactStatusNamePipe } from './pipes/contact-status-name/contact-status-name.pipe';
import { PluralPipe } from './pipes/plural/plural.pipe';
import { PaymentStatusNamePipe } from './pipes/payment-status-name/payment-status-name.pipe';
import { PaymentStatusBackgroundPipe } from './pipes/payment-status-background/payment-status-background.pipe';
import { PaymentStatusIconPipe } from './pipes/payment-status-icon/payment-status-icon.pipe';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { PaymentTypeNamePipe } from './pipes/payment-type-name/payment-type-name.pipe';
import { PaymentTypeDescriptionPipe } from './pipes/payment-type-description/payment-type-description.pipe';
import { PaymentTypeIconPipe } from './pipes/payment-type-icon/payment-type-icon.pipe';
import { PaymentTypeClassPipe } from './pipes/payment-type-class/payment-type-class.pipe';
import { PaymentSourceTypeNamePipe } from './pipes/payment-source-type-name/payment-source-type-name.pipe';
import { InsuranceIconPipe } from './pipes/insurance-icon/insurance-icon.pipe';
import { InsuranceBackgroundPipe } from './pipes/insurance-background/insurance-background.pipe';
import { PaymentTypeLabelPipe } from './pipes/payment-type-label/payment-type-label.pipe';
import { PaymentTypeValuePipe } from './pipes/payment-type-value/payment-type-value.pipe';
import { LoadingContentComponent } from './components/loading-content/loading-content.component';
import { CardContentResultsComponent } from './components/card-content-results/card-content-results.component';
import { CardContentNoResultsComponent } from './components/card-content-no-results/card-content-no-results.component';
import { CardContentSearchEngineComponent } from './components/card-content-search-engine/card-content-search-engine.component';
import { CardContentMainActionComponent } from './components/card-content-main-action/card-content-main-action.component';

@NgModule({
    declarations: [
        CardContentKpiComponent,
        CardContentMainActionComponent,
        CardContentNoResultsComponent,
        CardContentResultsComponent,
        CardContentSearchEngineComponent,
        CardContentTitleComponent,
        CardPaymentComponent,
        ContactStatusNamePipe,
        InsuranceIconPipe,
        InsuranceBackgroundPipe,
        LoadingContentComponent,
        PaymentStatusBackgroundPipe,
        PaymentStatusIconPipe,
        PaymentStatusNamePipe,
        PluralPipe,
        PaymentTypeNamePipe,
        PaymentTypeDescriptionPipe,
        PaymentTypeIconPipe,
        PaymentTypeClassPipe,
        PaymentSourceTypeNamePipe,
        PaymentTypeLabelPipe,
        PaymentTypeValuePipe,
    ],
    exports: [
        CardContentKpiComponent,
        CardContentMainActionComponent,
        CardContentNoResultsComponent,
        CardContentResultsComponent,
        CardContentSearchEngineComponent,
        CardContentTitleComponent,
        CardPaymentComponent,
        ContactStatusNamePipe,
        LoadingContentComponent,
        PaymentStatusNamePipe,
        PluralPipe,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
