import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    DEFAULT_PHONE_CODE_ID,
    EMAIL_LENGTH,
    OWN_NAME_LENGTH,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { CreateExecutive } from '@interfaces/create-executive.interface';
import { Executive } from '@interfaces/executive.interface';
import { ExecutiveService } from '@services/executive.service';
import { SinisterService } from '@services/sinister.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-sinister-executive',
    templateUrl: './modal-select-sinister-executive.component.html',
    styles: [],
    standalone: false
})
export class ModalSelectSinisterExecutiveComponent implements OnInit {
    @Input() modalId = '';
    @Input() contactId = '';
    @Input() policyId = '';
    @Input() sinisterId = '';
    @Output() executiveSelected = new EventEmitter<Executive>();
    executives: Executive[] = [];
    form = this._buildForm();
    private _isFormSubmitted = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _executiveService: ExecutiveService,
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _router: Router,
        private _sinisterService: SinisterService
    ) {}

    ngOnInit(): void {
        this._loadExecutives();
    }

    closeModal(): void {
        this.form.reset();
        this.form.patchValue({ phoneCodeId: DEFAULT_PHONE_CODE_ID });
        ModalPlugin.hide(this.modalId);
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

    loadExecutive(data: any): void {
        const executive: Executive = this.executives[data.target.selectedIndex];
        this.form.patchValue({
            name: executive.name,
            phoneCodeId: executive.phoneCodeId,
            phoneNumber: executive.phoneNumber,
            email: executive.email,
        });
    }

    patchPhoneCodeId(phoneCodeId: number): void {
        this.form.patchValue({ phoneCodeId });
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            if (this._hasExecutiveId()) {
                this._updateExecutive();
            } else {
                this._createExecutive();
            }
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            executiveId: [''],
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(OWN_NAME_LENGTH.MIN),
                    Validators.maxLength(OWN_NAME_LENGTH.MAX),
                    ValidatorsHelper.ownName,
                ],
            ],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: ['', [ValidatorsHelper.phoneNumber]],
            email: [
                '',
                [
                    Validators.email,
                    Validators.minLength(EMAIL_LENGTH.MIN),
                    Validators.maxLength(EMAIL_LENGTH.MAX),
                ],
            ],
        });
    }

    private _createExecutive(): void {
        const requestBody = this._generateRequestBody();
        this._executiveService.createExecutive(requestBody).subscribe((res) => {
            this._selectExecutive(res.data);
        });
    }

    private _updateExecutive(): void {
        const requestBody = this._generateRequestBody();
        this._executiveService
            .updateExecutive(this.form.value.executiveId, requestBody)
            .subscribe((res) => {
                this._selectExecutive(this.form.value.executiveId);
            });
    }

    private _generateRequestBody(): CreateExecutive {
        return {
            name: this.form.value.name,
            phoneCodeId: this.form.value.phoneCodeId,
            phoneNumber: this.form.value.phoneNumber,
            email: this.form.value.email,
        };
    }

    private _hasExecutiveId(): boolean {
        return this.form.value.executiveId;
    }

    private _loadExecutives(): void {
        const fields = 'executiveId,name,phoneCodeId,phoneNumber,email';
        this._executiveService
            .getWorkspaceExecutives(fields)
            .subscribe((res) => {
                this.executives = res.data.items;
            });
    }

    private _selectExecutive(executiveId: string): void {
        this._sinisterService
            .selectExecutive(
                this.contactId,
                this.policyId,
                this.sinisterId,
                executiveId
            )
            .subscribe(() => {
                this._loadingService.hide();
                this._reloadPage();
                AlertHelper.executiveSelected();

                //this.executiveSelected.emit(this.form.value);
            });
    }

    private _reloadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(
            [
                '/' +
                    ROUTES_NAME.showSinisterHistory(
                        this.contactId,
                        this.policyId,
                        this.sinisterId
                    ),
            ],
            { relativeTo: this._activatedRoute }
        );
    }
}
