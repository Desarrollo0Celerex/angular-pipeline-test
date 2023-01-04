import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdatePolicyInsuredPage } from './update-policy-insured.page'

const routes: Routes = [{ path: '', component: UpdatePolicyInsuredPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePolicyInsuredRoutingModule { }
