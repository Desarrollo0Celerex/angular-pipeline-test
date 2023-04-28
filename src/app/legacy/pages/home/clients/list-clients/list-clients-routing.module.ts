import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListClientsPage } from './list-clients.page';

const routes: Routes = [{ path: '', component: ListClientsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListClientsRoutingModule { }
