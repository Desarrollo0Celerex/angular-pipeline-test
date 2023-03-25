import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemePage } from './theme.page';

const routes: Routes = [{ path: '', component: ThemePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
