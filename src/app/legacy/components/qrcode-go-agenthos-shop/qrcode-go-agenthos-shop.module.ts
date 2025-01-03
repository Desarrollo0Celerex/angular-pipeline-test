import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrcodeGoAgenthosShopComponent } from './qrcode-go-agenthos-shop.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [QrcodeGoAgenthosShopComponent],
    exports: [QrcodeGoAgenthosShopComponent],
    imports: [CommonModule, SharedModule],
})
export class QrcodeGoAgenthosShopModule {}
