import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListContactsRoutingModule } from './list-contacts-routing.module';
import { ListContactsPage } from './list-contacts.page';


@NgModule({
  declarations: [
    ListContactsPage
  ],
  imports: [
    CommonModule,
    ContentsModule,
    ListContactsRoutingModule
  ]
})
export class ListContactsModule { }
