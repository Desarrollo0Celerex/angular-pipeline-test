import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsCollectionPage } from './stats-collection.page';

const routes: Routes = [{ path: '', component: StatsCollectionPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsCollectionRoutingModule { }
