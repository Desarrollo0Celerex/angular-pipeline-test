import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ROUTES_NAME } from '@constants/routes-name';
import { SmartComponent } from '@core/classes/smart-component';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { PolicyService } from '@core/services/policy/policy.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Policy } from '@core/interfaces/policy.interface';
declare var ModalPlugin: any;

enum ACTIONS {
    SEARCH_POLICY = 1,
    POLICY_FOUND = 2,
    POLICY_NOT_FOUND = 3,
    POLICY_NOT_PENDING_RECEIPTS = 4,
}

@Component({
    selector: 'agt-modal-search-policy',
    templateUrl: './modal-search-policy.container.html',
    styles: [],
    standalone: false
})
export class ModalSearchPolicyContainer extends SmartComponent {
    @Input() modalId: string = '';
    @Output() loadPolicy: EventEmitter<void> = new EventEmitter<void>();
    form: FormGroup = this._buildForm();
    private _isFormSubmitted: boolean = false;
    private _policy: Policy | undefined = undefined;
    private _selectedAction: number = ACTIONS.SEARCH_POLICY;

    constructor(
        private _formBuilder: FormBuilder,
        private _policyService: PolicyService
    ) {
        super();
    }

    get canShowResponseContainer(): boolean {
        return this.modalActionButtonLabel !== '';
    }

    get modalActionButtonIcon(): string {
        switch (this._selectedAction) {
            case ACTIONS.POLICY_FOUND:
                return 'fa-list-ul';
            case ACTIONS.POLICY_NOT_FOUND:
                return 'fa-file-text';
            case ACTIONS.POLICY_NOT_PENDING_RECEIPTS:
                return 'fa-list-ul';
            default:
                return '';
        }
    }

    get modalActionButtonLabel(): string {
        switch (this._selectedAction) {
            case ACTIONS.POLICY_FOUND:
                return 'Ver recibos pendientes';
            case ACTIONS.POLICY_NOT_FOUND:
                return 'Cargar póliza';
            case ACTIONS.POLICY_NOT_PENDING_RECEIPTS:
                return 'Ver recibos pagados';
            default:
                return '';
        }
    }

    get modalDescription(): string {
        switch (this._selectedAction) {
            case ACTIONS.POLICY_FOUND:
                return 'Revisa el historial de pagos para validar todos los recibos pendientes de esta póliza.';
            case ACTIONS.POLICY_NOT_FOUND:
                return 'Revisa que la información que ingresaste sobre la póliza sea correcta.';
            case ACTIONS.POLICY_NOT_PENDING_RECEIPTS:
                return 'Revisa el historial de pagos para validar todos los recibos pagados de esta póliza.';
            default:
                return '';
        }
    }

    get modalDetails(): string {
        switch (this._selectedAction) {
            case ACTIONS.POLICY_FOUND:
                return 'Si hay un error, podrás aplicar los recibos pendientes';
            case ACTIONS.POLICY_NOT_FOUND:
                return 'Si no encuentras la póliza, intenta cargarla para continuar';
            case ACTIONS.POLICY_NOT_PENDING_RECEIPTS:
                return 'Si hay un error, podrás editar los recibos pagados';
            default:
                return '';
        }
    }

    get modalMessage(): string {
        switch (this._selectedAction) {
            case ACTIONS.SEARCH_POLICY:
                return 'Ingresa la póliza a la que deseas aplicar el pago.';
            case ACTIONS.POLICY_FOUND:
                return 'Se encontraron recibos pendientes para esta póliza.';
            case ACTIONS.POLICY_NOT_FOUND:
                return 'No hay pólizas cargadas con los datos ingresados.';
            case ACTIONS.POLICY_NOT_PENDING_RECEIPTS:
                return 'Esta póliza ya cuenta con todos los recibos pagados.';
            default:
                return '';
        }
    }

    get modalTitle(): string {
        switch (this._selectedAction) {
            case ACTIONS.SEARCH_POLICY:
                return 'Aplicar Pago';
            case ACTIONS.POLICY_FOUND:
                return 'Recibos Encontrados';
            case ACTIONS.POLICY_NOT_FOUND:
                return 'Sin Resultados';
            case ACTIONS.POLICY_NOT_PENDING_RECEIPTS:
                return 'Sin Recibos Pendientes';
            default:
                return '';
        }
    }

    get routeLink(): string {
        switch (this._selectedAction) {
            case ACTIONS.POLICY_FOUND:
                return `/${ROUTES_NAME.pendingReceipts(
                    this._policy!.contactId,
                    this._policy!.policyId,
                    this._policy!.paymentId
                )}`;
            case ACTIONS.POLICY_NOT_PENDING_RECEIPTS:
                return `/${ROUTES_NAME.policyReceiptsPaid(
                    this._policy!.contactId,
                    this._policy!.policyId,
                    this._policy!.paymentId
                )}`;
            default:
                return '.';
        }
    }

    closeModal(): void {
        this.form.reset();
        this._isFormSubmitted = false;
        ModalPlugin.hide(this.modalId);
    }

    doAction(): void {
        this.closeModal();
        switch (this._selectedAction) {
            case ACTIONS.POLICY_NOT_FOUND:
                this.loadPolicy.emit();
                break;
        }
        // wait for a second to reset the value and dont clash with the selected value
        setTimeout(() => {
            this._selectedAction = ACTIONS.SEARCH_POLICY;
        }, 1000);
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    resetSelectedAction(): void {
        this._selectedAction = ACTIONS.SEARCH_POLICY;
    }

    validateForm(): void {
        if (this.form.valid) {
            this._searchPolicy();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            policyNumber: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100),
                    ValidatorsHelper.freeText,
                ],
            ],
        });
    }

    private _handleSearchResult(res: HttpResponseItems): void {
        if (res.totalItems === 0) {
            this._selectedAction = ACTIONS.POLICY_NOT_FOUND;
        } else {
            this._policy = res.items[0];
            this._selectedAction =
                this._policy!.totalBills === this._policy!.totalTickets
                    ? ACTIONS.POLICY_NOT_PENDING_RECEIPTS
                    : ACTIONS.POLICY_FOUND;
        }
    }

    private _searchPolicy(): void {
        const page: number = 1;
        const perPage: number = 1;
        const fields: string =
            'policyId,totalBills,totalTickets,contactId,paymentId';
        const filters: string = '';
        const sortBy: string = '-validityStartDate';
        const search: string = `policyNumber:${this.form.controls.policyNumber.value}`;
        this._policyService
            .getWorkspacePolicies(
                page,
                perPage,
                fields,
                filters,
                sortBy,
                search
            )
            .pipe(this.untilComponentDestroy())
            .subscribe((res: HttpResponseItems) => {
                this._handleSearchResult(res);
            });
    }
}
