import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FILE_SIZES } from '@constants/global';
import { CONTACT_TYPES } from '@contact/enums/contact-types.enum';
import { LoadingService } from '@core/services/loading/loading.service';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { InsuranceType } from '@insurance-type/interfaces/insurance-type.interface';
import { InsuranceTypeService } from '@insurance-type/services/insurance-type.service';
import { InsuranceCategory } from '@insurance/interfaces/insurance-category.interface';
import { Insurance } from '@insurance/interfaces/insurance.interface';
import { InsuranceService } from '@insurance/services/insurance.service';
import { Insurer } from '@insurer/interfaces/insurer.interface';
import { InsurerService } from '@insurer/services/insurer.service';
import { POLICY_ENDPOINTS } from '@policy/constants/endpoints';
import { POLICY_ROUTES } from '@policy/constants/routes';
import { PolicyService } from '@policy/services/policy.service';
import {
    FileParam,
    FileUploaderComponent,
} from '@shared/components/file-uploader/file-uploader.component';
import { WorkspaceService } from '@workspace/services/workspace.service';
import { Observable, forkJoin } from 'rxjs';
import { CreatePolicyModalService } from './create-policy-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { ContactService } from '@contact/services/contact.service';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-create-policy-modal',
    templateUrl: './create-policy-modal.component.html',
    styles: [],
})
export class CreatePolicyModalComponent
    extends SmartComponent
    implements OnInit
{
    @Input() modalId = 'agt-create-policy-modal';
    @ViewChild(FileUploaderComponent)
    fileUploaderComponent!: FileUploaderComponent;
    allowedFileExtensions: string[] = ['pdf'];
    insuranceCategories: InsuranceCategory[] = [];
    insuranceTypes: InsuranceType[] = [];
    insurers: Insurer[] = [];
    form = this._buildForm();
    maxFileSize: string = FILE_SIZES.LARGE;
    uploadPolicyEndpoint = '';
    private _contactId = '';
    private _contactType = 0;
    private _isFormSubmitted = false;
    private _newContactId = '';
    private _oldPolicyId = '';
    private _contactAction = 0;
    private _policyId = '';
    private _workpaceCountryId = 0;

    constructor(
        private _authService: AuthService,
        private _contactService: ContactService,
        private _createPolicyModalService: CreatePolicyModalService,
        private _formBuilder: FormBuilder,
        private _insuranceService: InsuranceService,
        private _insuranceTypeService: InsuranceTypeService,
        private _insurerService: InsurerService,
        private _loadingService: LoadingService,
        private _policyService: PolicyService,
        private _router: Router,
        private _workspaceService: WorkspaceService
    ) {
        super();
    }

    ngOnInit(): void {
        this._createPolicyModalService.createPolicyModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._contactId = data.contactId;
                this._contactAction = data.contactAction;
                this._contactType = data.contactType;
                this._oldPolicyId = data.oldPolicyId;
                this._newContactId = data.newContactId;
                this._enableInsurenceFields();
                this._checkPolicyAction();
            });
    }

    closeModal(): void {
        this._closeModal();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'file') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    loadInsuranceTypes(): void {
        this.form.patchValue({ insuranceTypeId: '' });
        const insuranceId = this.form.value.insuranceId;
        this._loadInsuranceTypes(insuranceId);
    }

    patchFileValue(value: string): void {
        this.form.patchValue({ file: value });
    }

    policyUploaded(): void {
        this._loadingService.hide();
        this._closeModal();
        this._router.navigateByUrl(
            POLICY_ROUTES.completePolicy(this._contactId, this._policyId)
        );
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._doPolicyAction();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            file: ['', [Validators.required]],
            insurerId: ['', [Validators.required]],
            insuranceId: ['', [Validators.required]],
            insuranceTypeId: ['', [Validators.required]],
        });
    }

    private _checkHasContactType(): void {
        if (this._contactType) {
            this._loadingService.hide();
            this._loadCatalogs();
            this._openModal();
        } else {
            this._loadContactType();
        }
    }

    private _checkPolicyAction(): void {
        switch (this._contactAction) {
            case CONTACT_ACTIONS.RENEW_POLICY:
            case CONTACT_ACTIONS.REISSUE_POLICY:
                this._loadPolicy();
                break;
            default:
                this._checkHasContactType();
        }
    }

    private _closeModal(): void {
        this.form.reset();
        this._isFormSubmitted = false;
        ModalPlugin.hide(this.modalId);
    }

    private _createPolicy(): void {
        this._loadingService.show();
        const requestBody = {
            insuranceId: this.form.value.insuranceId,
            insuranceTypeId: this.form.value.insuranceTypeId,
        };
        this._policyService
            .createPolicy(this._contactId, requestBody)
            .subscribe((policyId) => {
                this._policyId = policyId;
                this._uploadPolicyFile();
            });
    }

    private _enableInsurenceFields(): void {
        this.form.controls.insuranceId.enable();
        this.form.controls.insuranceTypeId.enable();
    }

    private _disableInsurenceFields(): void {
        this.form.controls.insuranceId.disable();
        this.form.controls.insuranceTypeId.disable();
    }

    private _doPolicyAction(): void {
        switch (this._contactAction) {
            case CONTACT_ACTIONS.RENEW_POLICY:
                this._renewPolicy();
                break;

            case CONTACT_ACTIONS.REISSUE_POLICY:
                this._reissuePolicy();
                break;

            default:
                this._createPolicy();
        }
    }

    private _generateFileParams(): FileParam[] {
        return [
            {
                name: 'insurerId',
                value: this.form.value.insurerId,
            },
        ];
    }

    private _generateRequestsToGetCategoryInsurances(
        insuranceCategories: InsuranceCategory[]
    ): Observable<Insurance[][]> {
        let requests: Observable<Insurance[]>[] = [];
        const fields: string =
            'insuranceId,name,title,description,background,icon';
        const sortBy: string = 'sorting';
        for (let insuranceCategory of insuranceCategories) {
            let request: Observable<Insurance[]> =
                this._insuranceService.getCategoryInsurances(
                    insuranceCategory.insuranceCategoryId,
                    fields,
                    sortBy
                );
            requests.push(request);
        }
        return forkJoin(requests);
    }

    private _loadCatalogs(): void {
        if (this._workpaceCountryId === 0) {
            this._loadWorkspace();
        }
        if (this.insuranceCategories.length === 0) {
            this._loadInsuranceCategories();
        }
    }

    private _loadCategoriesInsurances(): void {
        const requests = this._generateRequestsToGetCategoryInsurances(
            this.insuranceCategories
        );
        requests.subscribe((responses) => {
            for (let index in this.insuranceCategories) {
                this.insuranceCategories[index].insurances = responses[index];
            }
        });
    }

    private _loadContactType(): void {
        this._loadingService.show();
        const fields = 'contactTypeId';
        this._contactService
            .getContact(this._contactId, fields)
            .subscribe((contact) => {
                this._loadingService.hide();
                this._contactType = contact.contactTypeId;
                this._loadCatalogs();
                this._openModal();
            });
    }

    private _loadCountryInsurers(): void {
        const fields = 'insurerId,name';
        this._insurerService
            .getCountryInsurers(this._workpaceCountryId, fields)
            .subscribe((insurers) => {
                this.insurers = insurers;
            });
    }

    private _loadInsuranceCategories(): void {
        const fields: string = 'insuranceCategoryId,name';
        const orderBy: string =
            this._contactType === CONTACT_TYPES.PERSON
                ? 'personSorting'
                : 'companySorting';
        this._insuranceService
            .getInsuranceCategories(fields, orderBy)
            .subscribe((insuranceCategories) => {
                this.insuranceCategories = insuranceCategories;
                this._loadCategoriesInsurances();
            });
    }

    private _loadInsuranceTypes(insuranceId: number): void {
        this.insuranceTypes = [];
        const fields = 'insuranceTypeId,name';
        this._insuranceTypeService
            .getInsuranceTypes(insuranceId, fields)
            .subscribe((insuranceTypes) => {
                this.insuranceTypes = insuranceTypes;
            });
    }

    private _loadPolicy(): void {
        this._loadingService.show();
        const fields = 'insurerId,insuranceId,insuranceTypeId';
        this._policyService
            .getContactPolicy(this._contactId, this._oldPolicyId, fields)
            .subscribe((policy) => {
                this.form.patchValue({
                    insurerId: policy.insurerId,
                    insuranceId: policy.insuranceId,
                    insuranceTypeId: policy.insuranceTypeId,
                });
                this._loadInsuranceTypes(policy.insuranceId);
                this._checkHasContactType();
                this._disableInsurenceFields();
            });
    }

    private _loadWorkspace(): void {
        const fields = 'countryId';
        this._workspaceService.getWorkspace(fields).subscribe((workspace) => {
            this._workpaceCountryId = workspace.countryId;
            this._loadCountryInsurers();
        });
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
        setTimeout(() => {
            DropifyPlugin.initAux(this.allowedFileExtensions, this.maxFileSize);
        }, 0);
    }

    private _reissuePolicy(): void {
        this._loadingService.show();
        const requestBody = {
            contactId: this._newContactId,
        };
        this._policyService
            .reissuePolicy(this._contactId, this._oldPolicyId, requestBody)
            .subscribe((newPolicyId) => {
                this._contactId = this._newContactId;
                this._policyId = newPolicyId;
                this._uploadPolicyFile();
            });
    }

    private _renewPolicy(): void {
        this._loadingService.show();
        const requestBody = {
            contactId: this._newContactId,
        };
        this._policyService
            .renewPolicy(this._contactId, this._oldPolicyId, requestBody)
            .subscribe((newPolicyId) => {
                this._contactId = this._newContactId;
                this._policyId = newPolicyId;
                this._uploadPolicyFile();
            });
    }

    private _uploadPolicyFile(): void {
        const uploadPolicyEndpoint = POLICY_ENDPOINTS.uploadContactPolicy(
            this._authService.workspaceId,
            this._contactId,
            this._policyId
        );
        const fileParams: FileParam[] = this._generateFileParams();
        this.fileUploaderComponent.uploadFile(fileParams, uploadPolicyEndpoint);
    }
}
