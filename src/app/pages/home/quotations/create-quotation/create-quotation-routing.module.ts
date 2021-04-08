import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateQuotationPage } from './create-quotation.page';

const routes: Routes = [{ path: '', component: CreateQuotationPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateQuotationRoutingModule { }
