import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardModuleModule } from '@components/card-module/card-module.module';
import { ModalConfirmGoToAgenthosAcademyModule } from '@components/modal-confirm-go-to-agenthos-academy/modal-confirm-go-to-agenthos-academy.module';
import { ModalConfirmGoToAgenthosHubModule } from '@components/modal-confirm-go-to-agenthos-hub/modal-confirm-go-to-agenthos-hub.module';
import { ModalConfirmGoToAgenthosSupportModule } from '@components/modal-confirm-go-to-agenthos-support/modal-confirm-go-to-agenthos-support.module';
import { WorkspaceInsuranceService } from '@services/workspace-insurance.service';
import { SiteService } from '@services/site.service';
import { WalletService } from '@services/wallet.service';
import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';
import { WelcomeService } from './welcome.service';

@NgModule({
  declarations: [
    WelcomePage
  ],
  imports: [
    CardContentTitleModule,
    CardModuleModule,
    CommonModule,
    ModalConfirmGoToAgenthosAcademyModule,
    ModalConfirmGoToAgenthosHubModule,
    ModalConfirmGoToAgenthosSupportModule,
    WelcomeRoutingModule
  ],
  providers: [
    SiteService,
    WalletService,
    WelcomeService,
    WorkspaceService,
    WorkspaceDirectoryService,
    WorkspaceInsuranceService,
    WorkspaceUserService
  ]
})
export class WelcomeModule { }
