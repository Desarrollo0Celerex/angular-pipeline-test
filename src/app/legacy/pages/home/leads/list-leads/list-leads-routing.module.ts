import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListLeadsPage } from './list-leads.page';

const routes: Routes = [{ path: '', component: ListLeadsPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListLeadsRoutingModule { }
