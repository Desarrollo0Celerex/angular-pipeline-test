import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpressContactPage } from './express-contact.page';

const routes: Routes = [{ path: '', component: ExpressContactPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpressContactRoutingModule { }
