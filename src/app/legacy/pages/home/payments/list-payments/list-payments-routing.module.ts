import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPaymentsPage } from './list-payments.page';

const routes: Routes = [{ path: '', component: ListPaymentsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPaymentsRoutingModule { }
