import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivatedLicensePage } from './activated-license.page';

const routes: Routes = [{ path: '', component: ActivatedLicensePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivatedLicenseRoutingModule { }
