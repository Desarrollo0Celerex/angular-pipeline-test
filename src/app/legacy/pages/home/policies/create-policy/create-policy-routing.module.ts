import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePolicyPage } from './create-policy.page';

const routes: Routes = [{ path: '', component: CreatePolicyPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePolicyRoutingModule { }
