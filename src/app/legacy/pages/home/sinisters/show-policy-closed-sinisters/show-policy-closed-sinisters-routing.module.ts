import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowPolicyClosedSinistersPage } from './show-policy-closed-sinisters.page'

const routes: Routes = [{ path: '', component: ShowPolicyClosedSinistersPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowPolicyClosedSinistersRoutingModule { }
