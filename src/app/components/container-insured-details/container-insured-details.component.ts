import { Component, Input, OnChanges } from '@angular/core';

import { INTERNAL_INSURANCES, INSURANCE_TYPES } from '@constants/global';
import { InternalInsuranceHelper } from '@helpers/internal-insurance.helper';
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
    INTERNAL_INSURANCES: any = INTERNAL_INSURANCES;
    INSURANCE_TYPES: any = INSURANCE_TYPES;

    get internalInsuranceId(): number {
        return (!!this.model.insured) ? InternalInsuranceHelper.calculateInternalInsuranceId(this.model.insured.insuranceId) : 0;
    }

    get insuranceTypeId(): number {
        return (!!this.model.insured) ? this.model.insured.insuranceTypeId : 0;
    }

    constructor(public model: ContainerInsuredDetailsService) { }

    ngOnChanges(): void {
        this.model.loadInsured(this.contactId, this.policyId, this.policyInsuredId);
    }

}
