import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactFileService } from '@services/contact-file.service';

import { ModalTransferContactFileComponent } from './modal-transfer-contact-file.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ModalTransferContactFileComponent],
    exports: [ModalTransferContactFileComponent],
    imports: [CommonModule, SharedModule],
    providers: [ContactFileService],
})
export class ModalTransferContactFileModule {}
