import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletContactPage } from './wallet-contact.page';

const routes: Routes = [{ path: '', component: WalletContactPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletContactRoutingModule { }
