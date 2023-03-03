import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IconPage } from './icon.page';

const routes: Routes = [{ path: '', component: IconPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconRoutingModule { }
