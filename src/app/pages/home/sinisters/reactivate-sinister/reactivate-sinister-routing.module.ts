import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactivateSinisterPage } from './reactivate-sinister.page';

const routes: Routes = [{ path: '', component: ReactivateSinisterPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactivateSinisterRoutingModule { }
