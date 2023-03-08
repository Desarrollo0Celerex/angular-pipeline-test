import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';

import { SiteCreatorRoutingModule } from './site-creator-routing.module';
import { SiteCreatorLayout } from './site-creator.layout';


@NgModule({
  declarations: [
    SiteCreatorLayout
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    SiteCreatorRoutingModule
  ]
})
export class SiteCreatorModule { }
