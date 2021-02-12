import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardLeadModule } from '@components/card-lead/card-lead.module';
import { ModalShowContactDataModule } from '@components/modal-show-contact-data/modal-show-contact-data.module';
import { LeadService } from '@services/lead.service';

import { ContentListComponent } from './content-list.component';
import { ContentListService } from './content-list.service';

@NgModule({
  declarations: [ContentListComponent],
  exports: [ContentListComponent],
  imports: [
    CardLeadModule,
    CommonModule,
    ModalShowContactDataModule
  ],
  providers: [ContentListService, LeadService]
})
export class ContentListModule { }
