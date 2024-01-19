import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
    DefaultMatCalendarRangeStrategy,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
    MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { CardKpiComponent } from './components/card-kpi/card-kpi.component';
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
import { CardSearchEngineComponent } from './components/card-search-engine/card-search-engine.component';
import { CardMainActionComponent } from './components/card-main-action/card-main-action.component';
import { CardPaymentAppliedComponent } from './components/card-payment-applied/card-payment-applied.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { CardCalendarRangeComponent } from './components/card-calendar-range/card-calendar-range.component';
import { GenderNamePipe } from './pipes/gender-name.pipe';
import { PhoneCodePipe } from './pipes/phone-code.pipe';
import { ModalSelectShippingChannelsComponent } from './components/modal-select-shipping-channels/modal-select-shipping-channels.component';
import { GenerateShippingInformationComponent } from './components/generate-shipping-information/generate-shipping-information.component';
import { ModalRequestShippingContactsComponent } from './components/modal-request-shipping-contacts/modal-request-shipping-contacts.component';
import { CountriesModule as CountriesLegacyModule } from '@countries/countries.module';
import { CountriesModule } from '@features-legacy/countries/countries.module';
import { DownloadContentComponent } from './components/download-content/download-content.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { AlertComponent } from './components/alert/alert.component';
import { FileExtensionComponent } from './components/file-extension/file-extension.component';
import { ShippingChannelsComponent } from './components/shipping-channels/shipping-channels.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

@NgModule({
    declarations: [
        CardKpiComponent,
        CardMainActionComponent,
        CardContentNoResultsComponent,
        CardContentResultsComponent,
        CardSearchEngineComponent,
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
        CardPaymentAppliedComponent,
        ContentListComponent,
        CardCalendarRangeComponent,
        GenderNamePipe,
        PhoneCodePipe,
        ModalSelectShippingChannelsComponent,
        GenerateShippingInformationComponent,
        ModalRequestShippingContactsComponent,
        DownloadContentComponent,
        QrCodeComponent,
        AlertComponent,
        FileExtensionComponent,
        ShippingChannelsComponent,
        FileUploaderComponent,
    ],
    exports: [
        AlertComponent,
        CardCalendarRangeComponent,
        CardKpiComponent,
        CardMainActionComponent,
        CardContentNoResultsComponent,
        CardContentResultsComponent,
        CardSearchEngineComponent,
        CardContentTitleComponent,
        CardPaymentComponent,
        CardPaymentAppliedComponent,
        ContactStatusNamePipe,
        ContentListComponent,
        DownloadContentComponent,
        FileExtensionComponent,
        FileUploaderComponent,
        GenderNamePipe,
        GenerateShippingInformationComponent,
        LoadingContentComponent,
        PaymentStatusNamePipe,
        PluralPipe,
        PhoneCodePipe,
        QrCodeComponent,
        ShippingChannelsComponent,
    ],
    imports: [
        CommonModule,
        CountriesLegacyModule,
        FormsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        NgxQRCodeModule,
        ReactiveFormsModule,
        RouterModule,
        CountriesModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es' },
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: DefaultMatCalendarRangeStrategy,
        },
    ],
})
export class SharedModule {}
