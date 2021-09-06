import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LaunchAppPage } from './launch-app.page';

const routes: Routes = [{ path: '', component: LaunchAppPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaunchAppRoutingModule { }
