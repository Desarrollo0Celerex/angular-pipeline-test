import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowSinisterHistoryPage } from './show-sinister-history.page';

const routes: Routes = [{ path: '', component: ShowSinisterHistoryPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowSinisterHistoryRoutingModule { }
