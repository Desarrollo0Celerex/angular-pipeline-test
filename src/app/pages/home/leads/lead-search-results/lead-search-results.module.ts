import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsModule } from '@components/search-results/search-results.module';

import { LeadSearchResultsRoutingModule } from './lead-search-results-routing.module';
import { LeadSearchResultsPage } from './lead-search-results.page';

@NgModule({
  declarations: [LeadSearchResultsPage],
  imports: [
    CommonModule,
    LeadSearchResultsRoutingModule,
    SearchResultsModule
  ]
})
export class LeadSearchResultsModule { }
