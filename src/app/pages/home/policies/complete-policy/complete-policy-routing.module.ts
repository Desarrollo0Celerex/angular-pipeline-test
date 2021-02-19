import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompletePolicyPage } from './complete-policy.page';

const routes: Routes = [{ path: '', component: CompletePolicyPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletePolicyRoutingModule { }
