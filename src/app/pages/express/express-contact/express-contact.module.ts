import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDoCallModule } from '@components/button-do-call/button-do-call.module';
import { ButtonSendEmailModule } from '@components/button-send-email/button-send-email.module';
import { ButtonSendTelegramModule } from '@components/button-send-telegram/button-send-telegram.module';
import { ButtonSendWhatsappModule } from '@components/button-send-whatsapp/button-send-whatsapp.module';
import { ButtonDownloadContactModule } from '@components/button-download-contact/button-download-contact.module';
import { LogoAgenthosDarkModule } from '@components/logo-agenthos-dark/logo-agenthos-dark.module';
import { ModalIncompleteContactDataModule } from '@components/modal-incomplete-contact-data/modal-incomplete-contact-data.module';
import { ExpressTokenService } from '@services/express-token.service';

import { ExpressContactRoutingModule } from './express-contact-routing.module';
import { ExpressContactPage } from './express-contact.page';
import { ExpressContactService } from './express-contact.service';


@NgModule({
  declarations: [ExpressContactPage],
  imports: [
    ButtonDoCallModule,
    ButtonSendEmailModule,
    ButtonSendTelegramModule,
    ButtonSendWhatsappModule,
    ButtonDownloadContactModule,
    CommonModule,
    ExpressContactRoutingModule,
    LogoAgenthosDarkModule,
    ModalIncompleteContactDataModule
  ],
  providers: [ExpressContactService, ExpressTokenService]
})
export class ExpressContactModule { }
