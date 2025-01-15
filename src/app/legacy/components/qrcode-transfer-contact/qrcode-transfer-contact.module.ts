import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpressTokenService } from '@services/express-token.service';

import { QrcodeTransferContactComponent } from './qrcode-transfer-contact.component';
import { QrcodeTransferContactService } from './qrcode-transfer-contact.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [QrcodeTransferContactComponent],
    exports: [QrcodeTransferContactComponent],
    imports: [CommonModule, SharedModule],
    providers: [ExpressTokenService, QrcodeTransferContactService],
})
export class QrcodeTransferContactModule {}
