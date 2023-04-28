import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvalidExpressTokenPage } from './invalid-express-token.page';

const routes: Routes = [{ path: '', component: InvalidExpressTokenPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvalidExpressTokenRoutingModule { }
