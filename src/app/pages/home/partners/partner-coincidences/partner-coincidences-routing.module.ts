import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartnerCoincidencesPage } from './partner-coincidences.page';

const routes: Routes = [{ path: '', component: PartnerCoincidencesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerCoincidencesRoutingModule { }
