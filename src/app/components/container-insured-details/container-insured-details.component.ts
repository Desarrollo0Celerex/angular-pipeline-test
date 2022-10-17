import { Component, Input, OnChanges } from '@angular/core';

import { INSURANCE_GROUPS, INSURANCE_TYPES } from '@constants/global';
import { ContainerInsuredDetailsService } from './container-insured-details.service';

@Component({
  selector: 'agt-container-insured-details',
  templateUrl: './container-insured-details.component.html',
  styles: [
  ],
  providers: [ContainerInsuredDetailsService]
})
export class ContainerInsuredDetailsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() policyInsuredId: string = '';
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    INSURANCE_TYPES: any = INSURANCE_TYPES;

    constructor(public model: ContainerInsuredDetailsService) { }

    ngOnChanges(): void {
        this.model.loadInsured(this.contactId, this.policyId, this.policyInsuredId);
    }

    get insuranceTypeId(): number {
        return (!!this.model.insured) ? this.model.insured.insuranceTypeId : 0;
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

}
