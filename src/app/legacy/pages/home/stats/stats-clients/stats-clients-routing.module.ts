import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsClientsPage } from './stats-clients.page';

const routes: Routes = [{ path: '', component: StatsClientsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsClientsRoutingModule { }
