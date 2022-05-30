import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { GroupService } from '@services/group.service';

import { GroupProfileRoutingModule } from './group-profile-routing.module';
import { GroupProfileLayout } from './group-profile.layout';


@NgModule({
  declarations: [
    GroupProfileLayout
  ],
  imports: [
    CommonModule,
    GroupProfileRoutingModule,
    LoadingContentModule
  ],
  providers: [
    GroupService
  ]
})
export class GroupProfileModule { }
