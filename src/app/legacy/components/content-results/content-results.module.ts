import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectContactActionModule } from '@components/modal-select-contact-action/modal-select-contact-action.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalSearchContactModule } from '@components/modal-search-contact/modal-search-contact.module';
import { ModalSearchPolicyModule } from '@components/modal-search-policy/modal-search-policy.module';
import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module';
import { SharedModule } from '@shared/shared.module';

import { ContentResultsComponent } from './content-results.component';

@NgModule({
    declarations: [ContentResultsComponent],
    exports: [ContentResultsComponent],
    imports: [
        CommonModule,
        ModalSearchContactModule,
        ModalSelectContactActionModule,
        ModalSelectContactTypeModule,
        ModalSearchPolicyModule,
        ModalCreateSinisterModule,
        SharedModule,
    ],
})
export class ContentResultsModule {}
