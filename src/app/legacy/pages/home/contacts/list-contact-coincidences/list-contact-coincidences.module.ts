import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentListModule } from '@components/content-list/content-list.module';
import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { ModalConfirmSaveContactModule } from '@components/modal-confirm-save-contact/modal-confirm-save-contact.module';
import { LabelFoundFormatModule } from '@pipes/label-found-format/label-found-format.module';
import { LabelFoundFormatPipe } from '@pipes/label-found-format/label-found-format.pipe';
import { ContactService } from '@core/services/contact/contact.service';
import { PolicyService } from '@services/policy.service';

import { ListContactCoincidencesRoutingModule } from './list-contact-coincidences-routing.module';
import { ListContactCoincidencesPage } from './list-contact-coincidences.page';
import { ListContactCoincidencesService } from './list-contact-coincidences.service';

@NgModule({
    declarations: [ListContactCoincidencesPage],
    imports: [
        CommonModule,
        ContentListModule,
        DropdownSelectPhoneCodeModule,
        LabelFoundFormatModule,
        ListContactCoincidencesRoutingModule,
        ModalConfirmSaveContactModule,
    ],
    providers: [
        ContactService,
        ListContactCoincidencesService,
        LabelFoundFormatPipe,
        PolicyService,
    ],
})
export class ListContactCoincidencesModule {}
