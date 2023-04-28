import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsSinistersPage } from './stats-sinisters.page';

const routes: Routes = [{ path: '', component: StatsSinistersPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsSinistersRoutingModule { }
