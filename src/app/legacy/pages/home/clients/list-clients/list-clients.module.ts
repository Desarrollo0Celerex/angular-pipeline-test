import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListClientsRoutingModule } from './list-clients-routing.module';
import { ListClientsPage } from './list-clients.page';


@NgModule({
  declarations: [ListClientsPage],
  imports: [
    CommonModule,
    ContentsModule,
    ListClientsRoutingModule
  ]
})
export class ListClientsModule { }
