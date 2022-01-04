import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListContactsPage } from './list-contacts.page';

const routes: Routes = [{ path: '', component: ListContactsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListContactsRoutingModule { }
