import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-policy-insured-actions',
    templateUrl: './modal-show-policy-insured-actions.component.html',
    styles: [],
    standalone: false
})
export class ModalShowPolicyInsuredActionsComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Output() selectPolicyInsuredUploadType: EventEmitter<void> = new EventEmitter<void>();
    @Output() selectReportFormatType: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _router: Router) { }

    goToPolicyHistory(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId));
    }

    _selectPolicyInsuredUploadType(): void {
        ModalPlugin.hide(this.modalId);
        this.selectPolicyInsuredUploadType.emit();
    }

    _selectReportFormatType(): void {
        ModalPlugin.hide(this.modalId);
        this.selectReportFormatType.emit();
    }

}
