import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { SiteService } from '@services/site.service';

import { SiteCreatorRoutingModule } from './site-creator-routing.module';
import { SiteCreatorLayout } from './site-creator.layout';
import { SiteCreatorService } from './site-creator.service';

@NgModule({
  declarations: [
    SiteCreatorLayout
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    SiteCreatorRoutingModule
  ],
  providers: [
    SiteService,
    SiteCreatorService
  ]
})
export class SiteCreatorModule { }
