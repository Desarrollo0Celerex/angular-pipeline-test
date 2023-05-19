import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListSinistersPage } from './list-sinisters.page';

const routes: Routes = [{ path: '', component: ListSinistersPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSinistersRoutingModule { }
