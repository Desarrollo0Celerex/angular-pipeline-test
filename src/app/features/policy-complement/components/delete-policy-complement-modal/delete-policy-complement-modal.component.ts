import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingService } from '@core/services/loading/loading.service';
import { PolicyComplementService } from '@policy-complement/services/policy-complement.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-delete-policy-complement-modal',
    templateUrl: './delete-policy-complement-modal.component.html',
    styles: [],
    standalone: false
})
export class DeletePolicyComplementModalComponent {
    @Input() contactId = '';
    @Input() policyId = '';
    @Output() complementDeleted = new EventEmitter<string>();
    isInitializedComponent = false;
    modalId = 'agt-delete-policy-complement-modal';
    policyComplementId = '';

    constructor(
        private _loadingService: LoadingService,
        private _policyComplementService: PolicyComplementService
    ) {}

    deletePolicyComplement(): void {
        this._loadingService.show();
        this._policyComplementService
            .deletePolicyComplement(
                this.contactId,
                this.policyId,
                this.policyComplementId
            )
            .subscribe(() => {
                this._loadingService.hide();
                this.complementDeleted.emit(this.policyComplementId);
            });
    }

    show(policyComplementId: string): void {
        if (!this.isInitializedComponent) {
            this.isInitializedComponent = true;
        }
        this.policyComplementId = policyComplementId;
        ModalPlugin.show(this.modalId);
    }
}
