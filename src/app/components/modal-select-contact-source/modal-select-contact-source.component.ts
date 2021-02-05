import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ModalSelectContactSourceService } from './modal-select-contact-source.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-contact-source',
  templateUrl: './modal-select-contact-source.component.html',
  styles: [
  ]
})
export class ModalSelectContactSourceComponent implements OnInit {
    @Input() contactSourceId: number;
    @Input() modalId: string;
    @Output() contactSourceIdSelected: EventEmitter<number>;

    constructor(public modalSelectContactSourceService: ModalSelectContactSourceService) {
        this.contactSourceId = 0;
        this.modalId = '';
        this.contactSourceIdSelected = new EventEmitter<number>();
    }

    ngOnInit(): void {
        this.modalSelectContactSourceService.buildContactSourceForm(this.contactSourceId);
        this.modalSelectContactSourceService.loadContactSources();
    }

    /**
     * Event submit to select the contact source
     */
    onSubmitSelectContactSource(): void {
        if(this.modalSelectContactSourceService.contactSourceForm.valid) {
            ModalPlugin.hide(this.modalId);
            this.contactSourceIdSelected.emit(this.modalSelectContactSourceService.f.contactSourceId.value);
        }
    }

}
