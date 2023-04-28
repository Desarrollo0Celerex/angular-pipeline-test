import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EndorsePolicyPage } from './endorse-policy.page';

const routes: Routes = [{path: '', component: EndorsePolicyPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndorsePolicyRoutingModule { }
