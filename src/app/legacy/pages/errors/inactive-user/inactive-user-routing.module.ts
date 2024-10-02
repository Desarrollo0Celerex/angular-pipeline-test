import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InactiveUserPage } from './inactive-user.page';

const routes: Routes = [{ path: '', component: InactiveUserPage }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InactiveUserRoutingModule {}
