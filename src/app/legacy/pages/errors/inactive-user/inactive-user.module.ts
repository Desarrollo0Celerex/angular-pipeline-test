import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InactiveUserRoutingModule } from './inactive-user-routing.module';
import { InactiveUserPage } from './inactive-user.page';
import { LogoAgenthosDarkModule } from '@components/logo-agenthos-dark/logo-agenthos-dark.module';

@NgModule({
    declarations: [InactiveUserPage],
    imports: [CommonModule, InactiveUserRoutingModule, LogoAgenthosDarkModule],
})
export class InactiveUserModule {}
