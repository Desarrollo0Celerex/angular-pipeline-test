import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoAgenthosDarkModule } from '@components/logo-agenthos-dark/logo-agenthos-dark.module';

import { NotAuthenticatedRoutingModule } from './not-authenticated-routing.module';
import { NotAuthenticatedPage } from './not-authenticated.page';


@NgModule({
  declarations: [NotAuthenticatedPage],
  imports: [
    CommonModule,
    NotAuthenticatedRoutingModule,
    LogoAgenthosDarkModule
  ]
})
export class NotAuthenticatedModule { }
