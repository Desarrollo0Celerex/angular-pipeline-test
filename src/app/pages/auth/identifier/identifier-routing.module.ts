import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentifierPage } from './identifier.page';

const routes: Routes = [{ path: '', component: IdentifierPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentifierRoutingModule { }
