import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactNotFoundPage } from './contact-not-found.page';

const routes: Routes = [{ path: '', component: ContactNotFoundPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactNotFoundRoutingModule { }
