import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowRecordPage } from './show-record.page';

const routes: Routes = [{ path: '', component: ShowRecordPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRecordRoutingModule { }
