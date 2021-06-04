import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSizeFormatModule } from '@pipes/file-size-format/file-size-format.module';
import { ContactFileService } from '@services/contact-file.service';

import { ModalShowContactFileDetailsComponent } from './modal-show-contact-file-details.component';

@NgModule({
  declarations: [ModalShowContactFileDetailsComponent],
  exports: [ModalShowContactFileDetailsComponent],
  imports: [
    CommonModule,
    FileSizeFormatModule
  ],
  providers: [ContactFileService]
})
export class ModalShowContactFileDetailsModule { }
