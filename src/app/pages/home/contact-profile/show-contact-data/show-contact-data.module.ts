import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonDoCallModule } from '@components/button-do-call/button-do-call.module';
import { ButtonSendEmailModule } from '@components/button-send-email/button-send-email.module';
import { ButtonSendTelegramModule } from '@components/button-send-telegram/button-send-telegram.module';
import { ButtonSendWhatsappModule } from '@components/button-send-whatsapp/button-send-whatsapp.module';
import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalContactSavedModule } from '@components/modal-contact-saved/modal-contact-saved.module';
import { ModalIncompleteContactDataModule } from '@components/modal-incomplete-contact-data/modal-incomplete-contact-data.module';
import { CivilStatusService } from '@services/civil-status.service';
import { ContactService } from '@services/contact.service';
import { ContactOccupationService } from '@services/contact-occupation.service';
import { ContactRelationService } from '@services/contact-relation.service';
import { GendersService } from '@services/genders.service';
import { OffspringService } from '@services/offspring.service';

import { ShowContactDataRoutingModule } from './show-contact-data-routing.module';
import { ShowContactDataPage } from './show-contact-data.page';
import { ShowContactDataService } from'./show-contact-data.service'

@NgModule({
  declarations: [ShowContactDataPage],
  imports: [
    ButtonDoCallModule,
    ButtonSendEmailModule,
    ButtonSendTelegramModule,
    ButtonSendWhatsappModule,
    CommonModule,
    DropdownSelectPhoneCodeModule,
    FormsModule,
    LoadingContentModule,
    ModalContactSavedModule,
    ModalIncompleteContactDataModule,
    ReactiveFormsModule,
    ShowContactDataRoutingModule
  ],
  providers: [CivilStatusService, ContactService, ContactOccupationService, ContactRelationService, DatePipe, GendersService, OffspringService, ShowContactDataService]
})
export class ShowContactDataModule { }
