import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalDownloadFileComponent } from './modal-download-file.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ModalDownloadFileComponent],
    exports: [ModalDownloadFileComponent],
    imports: [CommonModule, SharedModule],
})
export class ModalDownloadFileModule {}
