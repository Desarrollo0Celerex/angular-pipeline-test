import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDownloadContactModule } from '@components/button-download-contact/button-download-contact.module';
import { ButtonSendWhatsappModule } from '@components/button-send-whatsapp/button-send-whatsapp.module';
import { ButtonSendEmailModule } from '@components/button-send-email/button-send-email.module';
import { QrcodeTransferContactModule } from '@components/qrcode-transfer-contact/qrcode-transfer-contact.module';
import { ContactService } from '@core/services/contact/contact.service';

import { ModalShowContactDataComponent } from './modal-show-contact-data.component';
import { ModalShowContactDataService } from './modal-show-contact-data.service';

@NgModule({
    declarations: [ModalShowContactDataComponent],
    exports: [ModalShowContactDataComponent],
    imports: [
        ButtonDownloadContactModule,
        ButtonSendEmailModule,
        ButtonSendWhatsappModule,
        CommonModule,
        QrcodeTransferContactModule,
    ],
    providers: [ContactService, ModalShowContactDataService],
})
export class ModalShowContactDataModule {}
