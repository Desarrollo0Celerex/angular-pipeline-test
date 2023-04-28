import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { MembersRoutingModule } from './members-routing.module';
import { MembersPage } from './members.page';


@NgModule({
  declarations: [
    MembersPage
  ],
  imports: [
    CommonModule,
    ContentsModule,
    MembersRoutingModule
  ]
})
export class MembersModule { }
