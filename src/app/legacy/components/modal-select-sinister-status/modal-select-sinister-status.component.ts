import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ModalSelectSinisterStatusService } from './modal-select-sinister-status.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-sinister-status',
    templateUrl: './modal-select-sinister-status.component.html',
    styles: [],
    standalone: false
})
export class ModalSelectSinisterStatusComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() contentTypeName: string = '';
    @Input() contentSubtype: number = 0;
    @Output() contentSubtypeNameSelected: EventEmitter<string> = new EventEmitter<string>();

    constructor(public modalSelectSinisterStatusService: ModalSelectSinisterStatusService) { }

    ngOnInit(): void {
        this._loadSinisterStatus();
    }

    onClickSelectSinisterStatus(sinisterStatusName: string): void {
        this.contentSubtypeNameSelected.emit(sinisterStatusName);
        ModalPlugin.hide(this.modalId);
    }

    /**
     * Emit the content subtype name
     */
    private _emitContentSubtypeName(): void {
        if(!!this.contentSubtype) {
            setTimeout(() => {
                const sinisterStatusName: string = this.modalSelectSinisterStatusService.getSinisterStatusName(this.contentSubtype);
                this.contentSubtypeNameSelected.emit(sinisterStatusName);
            }, 0);
        }
    }

    /**
     * Load the sinister status
     */
    private _loadSinisterStatus(): void {
        this.modalSelectSinisterStatusService.loadSinisterStatus();
        this._emitContentSubtypeName();
    }

}
