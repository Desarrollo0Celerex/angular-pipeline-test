import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientSearchResultsPage } from './client-search-results.page';

const routes: Routes = [{ path: '', component: ClientSearchResultsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSearchResultsRoutingModule { }
