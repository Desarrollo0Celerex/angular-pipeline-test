import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPartnersPage } from './list-partners.page';

const routes: Routes = [{ path: '', component: ListPartnersPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPartnersRoutingModule { }
