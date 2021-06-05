import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadContactFilePage } from './upload-contact-file.page';

const routes: Routes = [{ path: '', component: UploadContactFilePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadContactFileRoutingModule { }
