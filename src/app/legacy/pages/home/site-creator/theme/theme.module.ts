import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeviceMacbookProModule } from '@components/device-macbook-pro/device-macbook-pro.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateSiteModule } from '@components/modal-confirm-update-site/modal-confirm-update-site.module';
import { SiteService } from '@services/site.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ThemeRoutingModule } from './theme-routing.module';
import { ThemePage } from './theme.page';

@NgModule({
    declarations: [ThemePage],
    imports: [
        CommonModule,
        DeviceMacbookProModule,
        FormsModule,
        LoadingContentModule,
        ModalConfirmUpdateSiteModule,
        ThemeRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [SiteService, WorkspaceService],
})
export class ThemeModule {}
