import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePolicyInsuredPage } from './create-policy-insured.page';

const routes: Routes = [{ path: '', component: CreatePolicyInsuredPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePolicyInsuredRoutingModule { }
