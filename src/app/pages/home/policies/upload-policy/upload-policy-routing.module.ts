import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadPolicyPage } from './upload-policy.page';

const routes: Routes = [{ path: '', component: UploadPolicyPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPolicyRoutingModule { }
