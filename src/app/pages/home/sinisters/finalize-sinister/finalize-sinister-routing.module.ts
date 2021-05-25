import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinalizeSinisterPage } from './finalize-sinister.page';

const routes: Routes = [{ path: '', component: FinalizeSinisterPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalizeSinisterRoutingModule { }
