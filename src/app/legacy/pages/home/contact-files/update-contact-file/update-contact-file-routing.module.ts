import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateContactFilePage } from './update-contact-file.page';

const routes: Routes = [{ path: '', component: UpdateContactFilePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateContactFileRoutingModule { }
