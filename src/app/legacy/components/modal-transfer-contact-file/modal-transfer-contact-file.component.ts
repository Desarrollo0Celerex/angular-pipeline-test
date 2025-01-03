import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';

import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';

import { ModalTransferContactFileService } from './modal-transfer-contact-file.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-transfer-contact-file',
    templateUrl: './modal-transfer-contact-file.component.html',
    styles: [],
    providers: [ModalTransferContactFileService],
})
export class ModalTransferContactFileComponent implements OnChanges, OnInit {
    @Input() modalId: string = '';
    @Input() contactFileData: ContactFileDataSend | null = null;

    constructor(
        public modalTransferContactFileService: ModalTransferContactFileService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
            !!changes.contactFileData &&
            !!changes.contactFileData.currentValue
        ) {
            this.modalTransferContactFileService.loadContactFile(
                changes.contactFileData.currentValue
            );
        }
    }

    ngOnInit(): void {}

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
