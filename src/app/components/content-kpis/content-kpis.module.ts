import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';
import { LeadService } from '@services/lead.service';
import { LeadStatusService } from '@services/lead-status.service';

import { ContentKpisComponent } from './content-kpis.component';
import { ContentKpisService } from './content-kpis.service';

@NgModule({
  declarations: [ContentKpisComponent],
  exports: [ContentKpisComponent],
  imports: [
    CommonModule,
    PluralNameFormatModule,
    RouterModule
  ],
  providers: [ContentKpisService, LeadService, LeadStatusService]
})
export class ContentKpisModule { }
