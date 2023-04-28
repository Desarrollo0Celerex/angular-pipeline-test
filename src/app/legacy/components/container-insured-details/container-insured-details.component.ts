import { Component, Input, OnChanges } from '@angular/core';

import { INSURANCE_GROUPS, INSURANCE_TYPES } from '@constants/global';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';

import { ContainerInsuredDetailsService } from './container-insured-details.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-insured-details',
  templateUrl: './container-insured-details.component.html',
  styles: [
  ],
  providers: [ContainerInsuredDetailsService]
})
export class ContainerInsuredDetailsComponent implements OnChanges {
    @Input() certificate: string = '';
    @Input() insuranceGroupId: number = 0;
    @Input() insuranceTypeId: string = '';
    @Input() policyInsuredId: string = '';
    @Input() policyNumber: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    INSURANCE_TYPES: any = INSURANCE_TYPES;
    modalIdUpdateSinisterCertificate: string = "agt-update-sinister-certificate";

    constructor(public model: ContainerInsuredDetailsService) { }

    ngOnChanges(): void {
        if(!!this.sinisterData && !!this.policyInsuredId) {
            this.model.loadInsured(this.sinisterData.contactId, this.sinisterData.policyId, this.policyInsuredId);
        }
    }

    get objectNameLabel(): string {
        let label: string = '';
        if(!!this.model.insured && !!this.model.insured.insuranceGroupId) {
            switch(this.model.insured.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS:
                case INSURANCE_GROUPS.MERCHANDISE: label = 'Nombre del Bien Asegurado'; break;
                case INSURANCE_GROUPS.RC: label = 'Nombre de la Persona o Bien Asegurado'; break;
            }
        }
        return label;
    }

    get objectUsageLabel(): string {
        let label: string = '';
        if(!!this.model.insured && !!this.model.insured.insuranceGroupId) {
            switch(this.model.insured.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS: label = 'Marca del Bien Asegurado'; break;
                case INSURANCE_GROUPS.MERCHANDISE: label = 'Uso del Bien Asegurado'; break;
                case INSURANCE_GROUPS.RC: label = 'Actividad Asegurada'; break;
            }
        }
        return label;
    }

    get objectDescriptionLabel(): string {
        let label: string = '';
        if(!!this.model.insured && !!this.model.insured.insuranceGroupId) {
            switch(this.model.insured.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS: label = 'Características del Bien Asegurado'; break;
                case INSURANCE_GROUPS.MERCHANDISE: label = 'Descripción del Bien Asegurado'; break;
                case INSURANCE_GROUPS.RC: label = 'Descripción'; break;
            }
        }
        return label;
    }

    updateCertificate(): void {
        ModalPlugin.show(this.modalIdUpdateSinisterCertificate);
    }

}
