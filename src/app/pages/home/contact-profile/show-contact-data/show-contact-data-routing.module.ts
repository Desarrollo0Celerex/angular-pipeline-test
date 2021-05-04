import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowContactDataPage } from './show-contact-data.page';

const routes: Routes = [{ path: '', component: ShowContactDataPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowContactDataRoutingModule { }
