import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListSearchResultsPage } from './list-search-results.page';

const routes: Routes = [{ path: '', component: ListSearchResultsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSearchResultsRoutingModule { }
