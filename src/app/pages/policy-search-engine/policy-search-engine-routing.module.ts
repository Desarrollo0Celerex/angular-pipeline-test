import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolicySearchEnginePage } from './policy-search-engine.page';

const routes: Routes = [{ path: '', component: PolicySearchEnginePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicySearchEngineRoutingModule { }
