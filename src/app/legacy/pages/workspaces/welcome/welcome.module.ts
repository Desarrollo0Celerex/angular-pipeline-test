import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoAgenthosDarkModule } from '@components/logo-agenthos-dark/logo-agenthos-dark.module';
import { ModalConfirmCreateWorkspaceModule } from '@components/modal-confirm-create-workspace/modal-confirm-create-workspace.module';
import { UserService } from '@services/user.service';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';
import { WelcomeService } from './welcome.service';


@NgModule({
  declarations: [WelcomePage],
  imports: [
    CommonModule,
    LogoAgenthosDarkModule,
    ModalConfirmCreateWorkspaceModule,
    WelcomeRoutingModule
  ],
  providers: [UserService, WelcomeService]
})
export class WelcomeModule { }
