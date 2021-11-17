import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentListModule } from '@components/content-list/content-list.module';
import { ModalConfirmCreateGroupModule } from '@components/modal-confirm-create-group/modal-confirm-create-group.module';

import { GroupCoincidencesRoutingModule } from './group-coincidences-routing.module';
import { GroupCoincidencesPage } from './group-coincidences.page';


@NgModule({
  declarations: [
    GroupCoincidencesPage
  ],
  imports: [
    CommonModule,
    ContentListModule,
    GroupCoincidencesRoutingModule,
    ModalConfirmCreateGroupModule
  ]
})
export class GroupCoincidencesModule { }
