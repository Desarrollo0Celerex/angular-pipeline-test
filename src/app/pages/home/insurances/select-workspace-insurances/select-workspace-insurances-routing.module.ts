import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectWorkspaceInsurancesPage } from './select-workspace-insurances.page';

const routes: Routes = [{ path: '', component: SelectWorkspaceInsurancesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectWorkspaceInsurancesRoutingModule { }
