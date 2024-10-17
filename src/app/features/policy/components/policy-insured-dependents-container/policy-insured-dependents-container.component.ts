import { Component, Input, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TITULAR_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { Insured } from '@interfaces/insured.interface';
import { PolicyInsuredService } from '@services/policy-insured.service';
import * as moment from 'moment';

@Component({
    selector: 'agt-policy-insured-dependents-container',
    templateUrl: './policy-insured-dependents-container.component.html',
    styles: [],
})
export class PolicyInsuredDependentsContainerComponent implements OnInit {
    @Input() contactId = '';
    @Input() policyId = '';
    hasInsureds = false;
    insureds: (Insured | null)[] = [];
    //form = this._buildForm();

    constructor(private _policyInsuredService: PolicyInsuredService) {}

    ngOnInit(): void {
        this._loadPolicyInsureds();
    }

    onAddInsured(): void {
        this.insureds.push(null);
    }

    /* constructor(private _formBuilder: FormBuilder) {}

    get insureds(): FormArray {
        return this.form.get('insureds') as FormArray;
    }

    addInsured(insured: Insured | null = null): void {
        this.insureds.push(this.newInsured(insured));
    }

    newInsured(insured: Insured | null): FormGroup {
        let insuredForm: FormGroup = this._formBuilder.group({
            name: [
                insured?.personName || '',
                [
                    Validators.required,
                    Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                    Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                    ValidatorsHelper.ownName,
                ],
            ],
            file: [],
            birthdate: [
                insured?.personBirthdate ? moment(insured.personBirthdate) : '',
                [ValidatorsHelper.datePicker],
            ],
            genderId: [
                insured?.personGenderId || '',
                [ValidatorsHelper.number],
            ],
            relationId: [insured?.personRelationId, [ValidatorsHelper.number]],
        });

        if (insured !== null) {
            insuredForm.addControl(
                'policyInsuredId',
                new FormControl(insured.policyInsuredId)
            );
        }
        return insuredForm;
    } */

    toggleHasInsureds(event: any): void {
        this.hasInsureds = event.target.checked;
        if (event.target.checked && this.insureds.length === 0) {
            //this.addInsured();
        }
    }

    /* private _buildForm(): FormGroup {
        return this._formBuilder.group({
            insureds: this._formBuilder.array([]),
        });
    } */

    private _loadPolicyInsureds(): void {
        const fields =
            'policyInsuredId,personName,policyUrl,personBirthdate,personGenderId,personRelationId';
        const page = 1;
        const perPage = 100;
        this._policyInsuredService
            .getPolicyInsureds(
                this.contactId,
                this.policyId,
                fields,
                page,
                perPage
            )
            .subscribe((res) => {
                this.insureds = res.data.items;
                if (this.insureds.length > 0) {
                    this.hasInsureds = true;
                    this._openFirstPanel();
                }
            });
    }

    private _openFirstPanel(): void {}
}
