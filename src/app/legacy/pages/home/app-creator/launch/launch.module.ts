import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardShareLinkByDirectLinkModule } from '@components/card-share-link-by-direct-link/card-share-link-by-direct-link.module';
import { CardShareLinkByFacebookModule } from '@components/card-share-link-by-facebook/card-share-link-by-facebook.module';
import { CardShareLinkByWhatsappModule } from '@components/card-share-link-by-whatsapp/card-share-link-by-whatsapp.module';
import { DeviceIphoneModule } from '@components/device-iphone/device-iphone.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { WalletService } from '@services/wallet.service';

import { LaunchRoutingModule } from './launch-routing.module';
import { LaunchPage } from './launch.page';

@NgModule({
  declarations: [
    LaunchPage
  ],
  imports: [
    CardShareLinkByDirectLinkModule,
    CardShareLinkByFacebookModule,
    CardShareLinkByWhatsappModule,
    CommonModule,
    DeviceIphoneModule,
    LaunchRoutingModule,
    LoadingContentModule,
  ],
  providers: [
    WalletService
  ]
})
export class LaunchModule { }
