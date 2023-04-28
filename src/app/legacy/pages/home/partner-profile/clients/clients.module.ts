import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';


@NgModule({
  declarations: [
    ClientsPage
  ],
  imports: [
    ClientsRoutingModule,
    CommonModule,
    ContentsModule,
  ]
})
export class ClientsModule { }
