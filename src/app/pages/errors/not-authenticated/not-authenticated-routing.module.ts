import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotAuthenticatedPage } from './not-authenticated.page';

const routes: Routes = [{ path: '', component: NotAuthenticatedPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotAuthenticatedRoutingModule { }
