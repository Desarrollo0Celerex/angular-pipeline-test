import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerCreateContactModule } from '@components/container-create-contact/container-create-contact.module';
import { ContentSearchEngineModule } from '@components/content-search-engine/content-search-engine.module';
import { PolicyService } from '@services/policy.service';

import { ChangeContactRoutingModule } from './change-contact-routing.module';
import { ChangeContactPage } from './change-contact.page';
import { ChangeContactService } from './change-contact.service';

@NgModule({
  declarations: [ChangeContactPage],
  imports: [
    CommonModule,
    ChangeContactRoutingModule,
    ContainerCreateContactModule,
    ContentSearchEngineModule
  ],
  providers: [ChangeContactService, PolicyService]
})
export class ChangeContactModule { }
