import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IMAGE_AND_DOCUMENT_FORMATS } from '@constants/global';
import { SmartComponent } from '@core/classes/smart-component';
import { INSURED_RELATIONS } from '@core/constants/settings';
import { AlertHelper } from '@core/helpers/alert.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { Gender } from '@gender/interfaces/gender.interface';
import { InsuredRelation } from '@insured-relation/interfaces/insured-relation.interface';
import { Insured } from '@interfaces/insured.interface';
import { PolicyInsuredService } from '@policy-insured/services/policy-insured.service';
import { SelectSmallFileModalService } from '@shared/components/select-small-file-modal/select-small-file-modal.service';

@Component({
    selector: 'agt-policy-insured-dependents-container',
    templateUrl: './policy-insured-dependents-container.component.html',
    styles: [],
})
export class PolicyInsuredDependentsContainerComponent
    extends SmartComponent
    implements OnInit
{
    @Input() contactId = '';
    @Input() policyId = '';
    @Input() genders: Gender[] = [];
    @Input() insuredRelations: InsuredRelation[] = [];
    activePanels: boolean[] = [];
    hasInsureds = false;
    insureds: (Insured | null)[] = [];
    insuredFiles: (File | undefined)[] = [];
    insuredDependetRelations: InsuredRelation[] = [];
    private _selectedInsuredIndex = -1;

    constructor(
        private _loadingService: LoadingService,
        private _policyInsuredService: PolicyInsuredService,
        private _selectSmallFile: SelectSmallFileModalService
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes &&
            changes.insuredRelations &&
            changes.insuredRelations.currentValue
        ) {
            this.insuredDependetRelations = this._filterInsuredRelations(
                changes.insuredRelations.currentValue
            );
        }
    }

    ngOnInit(): void {
        this._loadPolicyInsureds();
        this._selectSmallFile.fileSelected$
            .pipe(this.untilComponentDestroy())
            .subscribe((file) => {
                this._selectFile(file);
            });
    }

    private _selectFile(file: any): void {
        if (this._selectedInsuredIndex > -1) {
            this.insuredFiles[this._selectedInsuredIndex] = file;
        }
    }

    onShowModalToSelectFile(data: {
        index: number;
        filePreviewUrl?: string;
        defaultFile?: File;
    }): void {
        this._selectedInsuredIndex = data.index;
        this._selectSmallFile.openModal({
            title: 'Actualizar Certificado',
            description:
                'Carga la credencial o certificado digital del asegurado.',
            buttonLabel: '📑 ACTUALIZAR CERTIFICADO',
            settings: {
                allowedFileExtensions: IMAGE_AND_DOCUMENT_FORMATS,
                defaultFile: data.defaultFile,
                filePreviewUrl: data.filePreviewUrl,
            },
        });
    }

    onAddInsured(): void {
        this.insuredFiles.push(undefined);
        this.activePanels.push(true);
        this.insureds.push(null);
    }

    onCreateInsured(data: { index: number; requestBody: FormData }): void {
        this._loadingService.show();
        this._policyInsuredService
            .createPolicyInsured(
                this.contactId,
                this.policyId,
                data.requestBody
            )
            .subscribe((insured) => {
                this._loadingService.hide();
                this.activePanels[data.index] = true;
                this.insureds[data.index] = insured;
                AlertHelper.policyInsuredCreated();
            });
    }

    onRemoveInsured(data: {
        index: number;
        policyInsuredId: string | null;
    }): void {
        if (data.policyInsuredId) {
            this._deletePolicyInsured(data.policyInsuredId, data.index);
        } else {
            this._deleteInsuredForm(data.index);
        }
    }

    onUpdateInsured(data: {
        index: number;
        policyInsuredId: string;
        requestBody: FormData;
    }): void {
        this._loadingService.show();
        this._policyInsuredService
            .updatePolicyInsured(
                this.contactId,
                this.policyId,
                data.policyInsuredId,
                data.requestBody
            )
            .subscribe((insured) => {
                this._loadingService.hide();
                this.activePanels[data.index] = true;
                this.insureds[data.index] = insured;
                AlertHelper.policyInsuredUpdated();
            });
    }

    toggleHasInsureds(event: any): void {
        this.hasInsureds = event.target.checked;
        if (event.target.checked && this.insureds.length === 0) {
            this.onAddInsured();
        }
    }

    private _closeAllPanels(): void {
        for (let index in this.insureds) {
            this.activePanels[index] = false;
        }
    }

    private _deletePolicyInsured(
        policyInsuredId: string,
        policyIndex: number
    ): void {
        this._loadingService.show();
        this._policyInsuredService
            .deletePolicyInsured(this.contactId, this.policyId, policyInsuredId)
            .subscribe(() => {
                this._loadingService.hide();
                this._deleteInsuredForm(policyIndex);
                AlertHelper.policyInsuredDeleted();
            });
    }

    private _deleteInsuredForm(index: number): void {
        this.insureds.splice(index, 1);
        this.insuredFiles.splice(index, 1);
        this.activePanels.splice(index, 1);
    }

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
                this.insureds = [...res];
                if (this.insureds.length > 0) {
                    this.hasInsureds = true;
                    this._initInsuredFiles();
                    this._closeAllPanels();
                    this._openFirstPanel();
                }
            });
    }

    private _openFirstPanel(): void {
        this.activePanels[0] = true;
    }

    private _filterInsuredRelations(
        relations: InsuredRelation[]
    ): InsuredRelation[] {
        return relations.filter(
            (relation) =>
                relation.insuredRelationId !== INSURED_RELATIONS.TITULAR
        );
    }

    private _initInsuredFiles(): void {
        for (let index in this.insureds) {
            this.insuredFiles[index] = undefined;
        }
    }
}
