import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVcardModule } from 'ngx-vcard';

import { ButtonDownloadContactComponent } from './button-download-contact.component';

@NgModule({
  declarations: [ButtonDownloadContactComponent],
  exports: [ButtonDownloadContactComponent],
  imports: [
    CommonModule,
    NgxVcardModule
  ]
})
export class ButtonDownloadContactModule { }
