import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPolicyInsuredsPage } from './list-policy-insureds.page';

const routes: Routes = [{  path: '', component: ListPolicyInsuredsPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPolicyInsuredsRoutingModule { }
