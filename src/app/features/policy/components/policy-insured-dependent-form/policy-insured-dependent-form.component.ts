import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TITULAR_NAME_LENGTH } from '@constants/global';
import { SmartComponent } from '@core/classes/smart-component';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { Gender } from '@gender/interfaces/gender.interface';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { InsuredRelation } from '@insured-relation/interfaces/insured-relation.interface';
import { Insured } from '@interfaces/insured.interface';
import moment from 'moment';

@Component({
    selector: 'agt-policy-insured-dependent-form',
    templateUrl: './policy-insured-dependent-form.component.html',
    styles: [],
    standalone: false
})
export class PolicyInsuredDependentFormComponent
    extends SmartComponent
    implements OnChanges
{
    @Input() insuredIndex = 0;
    @Input() insured: Insured | null = null;
    @Input() genders: Gender[] = [];
    @Input() insuredRelations: InsuredRelation[] = [];
    @Input() insuredFile?: File;
    @Input() isActivePanel = false;
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Output() insuredDeleted = new EventEmitter<{
        index: number;
        policyInsuredId: string | null;
    }>();
    @Output() createInsured = new EventEmitter<{
        index: number;
        requestBody: FormData;
    }>();
    @Output() updateInsured = new EventEmitter<{
        index: number;
        policyInsuredId: string;
        requestBody: FormData;
    }>();
    @Output() selectFile = new EventEmitter<{
        index: number;
        filePreviewUrl?: string;
        defaultFile?: File;
    }>();
    form = this._buildForm();
    isFormSubmitted = false;
    canSaveInsured = true;

    constructor(private _formBuilder: FormBuilder) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.insured && changes.insured.currentValue) {
            this.canSaveInsured = false;
            this._populateForm(changes.insured.currentValue);
        }
    }

    get buttonActionLabel(): string {
        return this.canSaveInsured
            ? '💾 GUARDAR ASEGURADO'
            : '📝 EDITAR ASEGURADO';
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    get panelId(): string {
        return 'panel-policy-dependent' + this.insuredIndex;
    }

    get panelCloseId(): string {
        return 'panel-close-policy-dependent' + this.insuredIndex;
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this.isFormSubmitted
        );
    }

    onDeleteInsured(): void {
        this.insuredDeleted.emit({
            index: this.insuredIndex,
            policyInsuredId:
                this.insured !== null && this.insured.policyInsuredId
                    ? this.insured.policyInsuredId
                    : null,
        });
    }

    onSelectFile(): void {
        const filePreviewUrl =
            this.insured && this.insured.policyUrl
                ? this.insured.policyUrl
                : undefined;
        const defaultFile = this.insuredFile ? this.insuredFile : undefined;
        this.selectFile.emit({
            index: this.insuredIndex,
            filePreviewUrl,
            defaultFile,
        });
    }

    onValidateForm(): void {
        if (!this.canSaveInsured) {
            this.canSaveInsured = true;
            this.form.enable();
            return;
        }
        this.isFormSubmitted = true;
        if (this.form.valid) {
            if (this.insured && this.insured.policyInsuredId) {
                this.updateInsured.emit({
                    index: this.insuredIndex,
                    policyInsuredId: this.insured.policyInsuredId,
                    requestBody: this._getRequestBody(),
                });
            } else {
                this.createInsured.emit({
                    index: this.insuredIndex,
                    requestBody: this._getRequestBody(),
                });
            }
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                    Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                    ValidatorsHelper.ownName,
                ],
            ],
            file: [],
            birthdate: ['', [ValidatorsHelper.datePicker]],
            genderId: ['', [ValidatorsHelper.number]],
            relationId: ['', [ValidatorsHelper.number]],
        });
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('personName', this.f.name.value);
        requestBody.append(
            'insuredPolicyFile',
            this.insuredFile ? this.insuredFile : ''
        );
        requestBody.append(
            'personBirthdate',
            this.f.birthdate.value
                ? this.f.birthdate.value.format('DD/MM/YYYY')
                : ''
        );
        requestBody.append('personGenderId', this.f.genderId.value);
        requestBody.append('personRelationId', this.f.relationId.value);
        return requestBody;
    }

    private _populateForm(insured: Insured): void {
        this.form.patchValue({
            name: insured.personName || '',
            birthdate: insured.personBirthdate
                ? moment(insured.personBirthdate)
                : '',
            genderId: insured.personGenderId || '',
            relationId: insured.personRelationId || '',
            file: insured.policy || undefined,
        });
        this.form.disable();
    }
}
