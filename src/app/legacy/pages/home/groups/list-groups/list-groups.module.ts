import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListGroupsRoutingModule } from './list-groups-routing.module';
import { ListGroupsPage } from './list-groups.page';


@NgModule({
  declarations: [
    ListGroupsPage
  ],
  imports: [
    CommonModule,
    ListGroupsRoutingModule,
    ContentsModule
  ]
})
export class ListGroupsModule { }
