import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolicyReceiptsPaidPage } from './policy-receipts-paid.page';

const routes: Routes = [{ path: '', component: PolicyReceiptsPaidPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyReceiptsPaidRoutingModule { }
