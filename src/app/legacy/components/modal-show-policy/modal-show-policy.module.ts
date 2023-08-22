import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { PolicyService } from '@services/policy.service';

import { ModalShowPolicyComponent } from './modal-show-policy.component';
import { ModalShowPolicyService } from './modal-show-policy.service';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ModalShowPolicyComponent],
    exports: [ModalShowPolicyComponent],
    imports: [CommonModule, NgxQRCodeModule, RouterModule],
    providers: [ModalShowPolicyService, PolicyService],
})
export class ModalShowPolicyModule {}
