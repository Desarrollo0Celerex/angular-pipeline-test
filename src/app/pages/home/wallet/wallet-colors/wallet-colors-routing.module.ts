import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletColorsPage } from './wallet-colors.page';

const routes: Routes = [{ path: '', component: WalletColorsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletColorsRoutingModule { }
