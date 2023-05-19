import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupCoincidencesPage } from './group-coincidences.page';

const routes: Routes = [{ path: '', component: GroupCoincidencesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupCoincidencesRoutingModule { }
