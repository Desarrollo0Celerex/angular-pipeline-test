import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateExternalPolicyPage } from './update-external-policy.page';

const routes: Routes = [{ path: '', component: UpdateExternalPolicyPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateExternalPolicyRoutingModule { }
