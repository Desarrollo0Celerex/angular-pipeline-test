import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateCompletePolicyPage } from './update-complete-policy.page';

const routes: Routes = [{ path: '', component: UpdateCompletePolicyPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateCompletePolicyRoutingModule { }
