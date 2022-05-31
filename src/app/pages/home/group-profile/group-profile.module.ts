import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardGroupAnnualWalletModule } from '@components/card-group-annual-wallet/card-group-annual-wallet.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSearchClientModule } from '@components/modal-search-client/modal-search-client.module';
import { ModalShowGroupDetailsModule } from '@components/modal-show-group-details/modal-show-group-details.module';
import { ModalUpdateGroupModule } from '@components/modal-update-group/modal-update-group.module';
import { GroupService } from '@services/group.service';

import { GroupProfileRoutingModule } from './group-profile-routing.module';
import { GroupProfileLayout } from './group-profile.layout';

@NgModule({
  declarations: [
    GroupProfileLayout
  ],
  imports: [
    CardGroupAnnualWalletModule,
    CommonModule,
    GroupProfileRoutingModule,
    LoadingContentModule,
    ModalSearchClientModule,
    ModalShowGroupDetailsModule,
    ModalUpdateGroupModule
  ],
  providers: [
    GroupService
  ]
})
export class GroupProfileModule { }
