import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangelogPage } from './changelog.page';

const routes: Routes = [{ path: '', component: ChangelogPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangelogRoutingModule { }
