import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentifyUserPage } from './identify-user.page';

const routes: Routes = [{ path: '', component: IdentifyUserPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentifyUserRoutingModule { }
