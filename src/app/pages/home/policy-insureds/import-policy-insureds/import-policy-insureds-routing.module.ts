import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImportPolicyInsuredsPage } from './import-policy-insureds.page'

const routes: Routes = [{ path: '', component: ImportPolicyInsuredsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportPolicyInsuredsRoutingModule { }
