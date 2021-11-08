import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListGroupsPage } from './list-groups.page';

const routes: Routes = [{ path: '', component: ListGroupsPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListGroupsRoutingModule { }
