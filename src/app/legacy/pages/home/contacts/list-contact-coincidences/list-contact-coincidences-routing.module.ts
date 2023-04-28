import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListContactCoincidencesPage } from './list-contact-coincidences.page';

const routes: Routes = [{ path: '', component: ListContactCoincidencesPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListContactCoincidencesRoutingModule { }
