import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CancelPolicyPage } from './cancel-policy.page';

const routes: Routes = [{ path: '', component: CancelPolicyPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelPolicyRoutingModule { }
