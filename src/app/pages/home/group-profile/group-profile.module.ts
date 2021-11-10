import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSearchClientModule } from '@components/modal-search-client/modal-search-client.module';
import { GroupService } from '@services/group.service';
import { GroupMemberService } from '@services/group-member.service';

import { GroupProfileRoutingModule } from './group-profile-routing.module';
import { GroupProfileLayout } from './group-profile.layout';


@NgModule({
  declarations: [
    GroupProfileLayout
  ],
  imports: [
    CommonModule,
    GroupProfileRoutingModule,
    LoadingContentModule,
    ModalSearchClientModule
  ],
  providers: [
    GroupService,
    GroupMemberService
  ]
})
export class GroupProfileModule { }
