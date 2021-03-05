import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsModule } from '@components/search-results/search-results.module';

import { ClientSearchResultsRoutingModule } from './client-search-results-routing.module';
import { ClientSearchResultsPage } from './client-search-results.page';


@NgModule({
  declarations: [ClientSearchResultsPage],
  imports: [
    CommonModule,
    ClientSearchResultsRoutingModule,
    SearchResultsModule
  ]
})
export class ClientSearchResultsModule { }
