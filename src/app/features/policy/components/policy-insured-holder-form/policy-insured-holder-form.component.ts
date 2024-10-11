import {
    Component,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
    Validators,
} from '@angular/forms';
import {
    IMAGE_AND_DOCUMENT_FORMATS,
    TITULAR_NAME_LENGTH,
} from '@constants/global';
import { SmartComponent } from '@core/classes/smart-component';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { Gender } from '@gender/interfaces/gender.interface';
import { GenderService } from '@gender/services/gender.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { InsuredRelation } from '@insured-relation/interfaces/insured-relation.interface';
import { InsuredRelationService } from '@insured-relation/services/insured-relation.service';
import { SelectSmallFileModalService } from '@shared/components/select-small-file-modal/select-small-file-modal.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'agt-policy-insured-holder-form',
    templateUrl: './policy-insured-holder-form.component.html',
    styles: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PolicyInsuredHolderFormComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PolicyInsuredHolderFormComponent),
            multi: true,
        },
    ],
})
export class PolicyInsuredHolderFormComponent
    extends SmartComponent
    implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
    @Input() isFormSubmitted = false;
    @Input() previewUrl = '';
    @Output() copyTitularIntoInsuredHolder = new EventEmitter<void>();
    form = this._formBuilder.group({
        isTitularTheInsuredHolder: [false],
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
    genders: Gender[] = [];
    insuredRelations: InsuredRelation[] = [];
    onTouchedCallback?: () => void;
    private _valueChangesSubscription?: Subscription;

    constructor(
        private _formBuilder: FormBuilder,
        private _genderService: GenderService,
        private _insuredRelationService: InsuredRelationService,
        private _selectSmallFile: SelectSmallFileModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._loadGenders();
        this._loadInsuredRelations();
        this._selectSmallFile.fileSelected$
            .pipe(this.untilComponentDestroy())
            .subscribe((file) => {
                this._selectInsuredHolderFile(file);
            });
    }

    ngOnDestroy(): void {
        this._valueChangesSubscription?.unsubscribe();
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

    onShowModalToSelectInsuredHolderFile(): void {
        this._selectSmallFile.openModal({
            title: 'Actualizar Certificado',
            description:
                'Carga la credencial o certificado digital del asegurado.',
            buttonLabel: '📑 ACTUALIZAR CERTIFICADO',
            settings: {
                allowedFileExtensions: IMAGE_AND_DOCUMENT_FORMATS,
                defaultFile: this.form.controls.file.value
                    ? this.form.controls.file.value
                    : undefined,
                filePreviewUrl: this.previewUrl ? this.previewUrl : undefined,
            },
        });
    }

    toggleInsuredHolderData(event: any): void {
        if (event.target.checked) {
            this.copyTitularIntoInsuredHolder.emit();
        }
    }

    private _loadGenders(): void {
        this._genderService.getGenders().subscribe((genders) => {
            this.genders = genders;
        });
    }

    private _loadInsuredRelations(): void {
        this._insuredRelationService
            .getInsuredRelations()
            .subscribe((insuredRelations) => {
                this.insuredRelations = insuredRelations;
            });
    }

    private _selectInsuredHolderFile(file: any): void {
        this.form.patchValue({ file });
    }

    /* Validator interface methods */

    validate(control: AbstractControl): ValidationErrors | null {
        return this.form.valid ? null : { invalidHolder: true };
    }

    /* ControlValueAccessor interface methods */
    writeValue(obj: any): void {
        obj && this.form.setValue(obj, { emitEvent: false });
    }

    registerOnChange(fn: any): void {
        this._valueChangesSubscription = this.form.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.form.disable() : this.form.enable();
    }
}
