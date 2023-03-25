import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';

import { SocialConnectRoutingModule } from './social-connect-routing.module';
import { SocialConnectLayout } from './social-connect.layout';


@NgModule({
  declarations: [
    SocialConnectLayout
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    SocialConnectRoutingModule
  ]
})
export class SocialConnectModule { }
