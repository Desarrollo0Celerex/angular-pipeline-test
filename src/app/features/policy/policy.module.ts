import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { ModalConfirmContactFieldsToRewriteComponent } from './componets/modal-confirm-contact-fields-to-rewrite/modal-confirm-contact-fields-to-rewrite.component';
import { SharedModule } from '@shared/shared.module';
import { GenderNamePipe } from '@shared/pipes/gender-name.pipe';
import { PhoneCodePipe } from '@shared/pipes/phone-code.pipe';

@NgModule({
    declarations: [ModalConfirmContactFieldsToRewriteComponent],
    exports: [ModalConfirmContactFieldsToRewriteComponent],
    imports: [CommonModule, PolicyRoutingModule, SharedModule],
    providers: [GenderNamePipe, PhoneCodePipe],
})
export class PolicyModule {}
