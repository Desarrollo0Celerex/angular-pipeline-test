import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvisoryPage } from './advisory.page';

const routes: Routes = [{ path: '', component: AdvisoryPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvisoryRoutingModule { }
