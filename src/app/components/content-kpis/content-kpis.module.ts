import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentKpisComponent } from './content-kpis.component';
import { ContentKpisService } from './content-kpis.service';

@NgModule({
  declarations: [ContentKpisComponent],
  exports: [ContentKpisComponent],
  imports: [
    CommonModule
  ],
  providers: [ContentKpisService]
})
export class ContentKpisModule { }
