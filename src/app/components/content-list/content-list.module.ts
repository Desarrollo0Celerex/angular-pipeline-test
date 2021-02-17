import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardLeadModule } from '@components/card-lead/card-lead.module';
import { CardQuotationModule } from '@components/card-quotation/card-quotation.module';
import { ContentSuggestionsModule } from '@components/content-suggestions/content-suggestions.module';
import { ContentResultsModule } from '@components/content-results/content-results.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalShowContactDataModule } from '@components/modal-show-contact-data/modal-show-contact-data.module';
import { ModalShowQuotationDetailsModule } from '@components/modal-show-quotation-details/modal-show-quotation-details.module';
import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';
import { LeadService } from '@services/lead.service';
import { QuotationService } from '@services/quotation.service';

import { ContentListComponent } from './content-list.component';
import { ContentListService } from './content-list.service';

@NgModule({
  declarations: [ContentListComponent],
  exports: [ContentListComponent],
  imports: [
    CardLeadModule,
    CardQuotationModule,
    CommonModule,
    ContentSuggestionsModule,
    ContentResultsModule,
    LoadingContentModule,
    PluralNameFormatModule,
    ModalShowContactDataModule,
    ModalShowQuotationDetailsModule
  ],
  providers: [ContentListService, LeadService, QuotationService]
})
export class ContentListModule { }
