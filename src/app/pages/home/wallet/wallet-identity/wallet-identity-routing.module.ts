import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletIdentityPage } from './wallet-identity.page';

const routes: Routes = [{ path: '', component: WalletIdentityPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletIdentityRoutingModule { }
