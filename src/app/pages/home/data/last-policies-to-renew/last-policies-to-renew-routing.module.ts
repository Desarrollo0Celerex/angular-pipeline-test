import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LastPoliciesToRenewPage } from './last-policies-to-renew.page';

const routes: Routes = [{ path: '', component: LastPoliciesToRenewPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastPoliciesToRenewRoutingModule { }
