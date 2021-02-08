import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonWhatsappModule } from '@components/button-whatsapp/button-whatsapp.module';
import { LogoAgenthosDarkModule } from '@components/logo-agenthos-dark/logo-agenthos-dark.module';
import { ModalIncompleteContactDataModule } from '@components/modal-incomplete-contact-data/modal-incomplete-contact-data.module';
import { ExpressTokenService } from '@services/express-token.service';

import { ExpressContactRoutingModule } from './express-contact-routing.module';
import { ExpressContactPage } from './express-contact.page';
import { ExpressContactService } from './express-contact.service';


@NgModule({
  declarations: [ExpressContactPage],
  imports: [
    ButtonWhatsappModule,
    CommonModule,
    ExpressContactRoutingModule,
    LogoAgenthosDarkModule,
    ModalIncompleteContactDataModule
  ],
  providers: [ExpressContactService, ExpressTokenService]
})
export class ExpressContactModule { }
