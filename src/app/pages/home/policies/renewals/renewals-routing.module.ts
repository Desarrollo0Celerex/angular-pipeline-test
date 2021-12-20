import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RenewalsPage } from './renewals.page';

const routes: Routes = [{ path: '', component: RenewalsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewalsRoutingModule { }
