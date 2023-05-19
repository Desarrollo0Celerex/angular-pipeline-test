import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ActivatedLicenseRoutingModule } from './activated-license-routing.module';
import { ActivatedLicensePage } from './activated-license.page';

@NgModule({
    declarations: [ActivatedLicensePage],
    imports: [CommonModule, ActivatedLicenseRoutingModule],
    providers: [WorkspaceService],
})
export class ActivatedLicenseModule {}
