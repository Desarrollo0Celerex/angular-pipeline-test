import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowPolicyOpenSinistersPage } from './show-policy-open-sinisters.page'

const routes: Routes = [{ path: '', component: ShowPolicyOpenSinistersPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowPolicyOpenSinistersRoutingModule { }
