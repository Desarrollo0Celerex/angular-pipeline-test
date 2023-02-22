import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardModuleModule } from '@components/card-module/card-module.module';
import { WalletService } from '@services/wallet.service';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

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
    WelcomeRoutingModule
  ],
  providers: [
    WalletService,
    WelcomeService,
    WorkspaceDirectoryService
  ]
})
export class WelcomeModule { }
