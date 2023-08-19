import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAcceptInvitationPage } from './check-accept-invitation.page';

const routes: Routes = [{ path: '', component: CheckAcceptInvitationPage }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CheckAcceptInvitationRoutingModule {}
