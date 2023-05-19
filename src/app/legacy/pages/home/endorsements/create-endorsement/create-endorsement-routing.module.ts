import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateEndorsementPage } from './create-endorsement.page';

const routes: Routes = [{ path: '', component: CreateEndorsementPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEndorsementRoutingModule { }
