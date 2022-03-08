import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FORMAT_TYPES } from '@constants/global';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-report-format',
  templateUrl: './modal-select-report-format.component.html',
  styles: [
  ]
})
export class ModalSelectReportFormatComponent {
    @Input() modalId: string = '';
    @Output() formatSelected: EventEmitter<string> = new EventEmitter<string>();
    FORMAT_TYPES: any = FORMAT_TYPES;

    selectFormat(format: string): void {
        ModalPlugin.hide(this.modalId);
        this.formatSelected.emit(format);
    }

}
