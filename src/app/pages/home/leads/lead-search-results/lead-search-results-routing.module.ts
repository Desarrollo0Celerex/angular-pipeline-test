import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadSearchResultsPage } from './lead-search-results.page';

const routes: Routes = [{ path: '', component: LeadSearchResultsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadSearchResultsRoutingModule { }
