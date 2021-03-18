import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangeContactPage } from './change-contact.page';

const routes: Routes = [{ path: '', component: ChangeContactPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeContactRoutingModule { }
