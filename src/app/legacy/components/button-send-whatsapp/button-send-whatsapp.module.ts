import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumberFormatModule } from '@pipes/phone-number-format/phone-number-format.module';
import { ContactService } from '@core/services/contact/contact.service';
import { ExpressTokenService } from '@services/express-token.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';

import { ButtonSendWhatsappComponent } from './button-send-whatsapp.component';
import { ButtonSendWhatsappService } from './button-send-whatsapp.service';

@NgModule({
    declarations: [ButtonSendWhatsappComponent],
    exports: [ButtonSendWhatsappComponent],
    imports: [CommonModule, PhoneNumberFormatModule],
    providers: [
        ButtonSendWhatsappService,
        ContactService,
        ExpressTokenService,
        WorkspaceUserService,
    ],
})
export class ButtonSendWhatsappModule {}
