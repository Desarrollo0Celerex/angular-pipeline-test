import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PendingReceiptsPage } from './pending-receipts.page';

const routes: Routes = [{ path: '', component: PendingReceiptsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingReceiptsRoutingModule { }
