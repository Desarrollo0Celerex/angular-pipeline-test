import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowPolicySinistersPage } from './show-policy-sinisters.page';

const routes: Routes = [{ path: '', component: ShowPolicySinistersPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowPolicySinistersRoutingModule { }
