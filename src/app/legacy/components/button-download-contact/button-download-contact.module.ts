import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVcardModule } from 'ngx-vcard';

import { ContactService } from '@core/services/contact/contact.service';
import { ExpressTokenService } from '@services/express-token.service';

import { ButtonDownloadContactComponent } from './button-download-contact.component';
import { ButtonDownloadContactService } from './button-download-contact.service';

@NgModule({
    declarations: [ButtonDownloadContactComponent],
    exports: [ButtonDownloadContactComponent],
    imports: [CommonModule, NgxVcardModule],
    providers: [
        ButtonDownloadContactService,
        ContactService,
        ExpressTokenService,
    ],
})
export class ButtonDownloadContactModule {}
