import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdatePolicyPage } from './update-policy.page';

const routes: Routes = [{ path: '', component: UpdatePolicyPage }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UpdatePolicyRoutingModule {}
