import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateContactPage } from './create-contact.page';

const routes: Routes = [{path: '', component: CreateContactPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateContactRoutingModule { }
