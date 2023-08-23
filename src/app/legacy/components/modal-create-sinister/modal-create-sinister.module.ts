import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '@features-legacy/auth/services/auth.service';
import { PolicyService } from '@services/policy.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterTypeService } from '@services/sinister-type.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';

import { ModalCreateSinisterComponent } from './modal-create-sinister.component';

@NgModule({
    declarations: [ModalCreateSinisterComponent],
    exports: [ModalCreateSinisterComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [
        AuthService,
        PolicyService,
        SinisterService,
        SinisterTypeService,
        WorkspaceUserService,
    ],
})
export class ModalCreateSinisterModule {}
