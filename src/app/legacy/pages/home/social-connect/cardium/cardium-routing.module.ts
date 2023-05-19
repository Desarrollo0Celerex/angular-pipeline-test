import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardiumPage } from './cardium.page';

const routes: Routes = [{ path: '', component: CardiumPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardiumRoutingModule { }
