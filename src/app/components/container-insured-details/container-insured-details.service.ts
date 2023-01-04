import { Injectable } from '@angular/core';

import { Insured } from '@interfaces/insured.interface';
import { PolicyInsuredService } from '@services/policy-insured.service';

@Injectable()
export class ContainerInsuredDetailsService {
    insured: Insured | null = null;

    constructor(private _policyInsuredService: PolicyInsuredService) { }

    loadInsured(contactId: string, policyId: string, policyInsuredId: string): void {
        const fields: string = 'insuranceId,buildingLocation,buildingName,buildingUsage,objectDescription,objectName,objectUsage,personAge,personName,personGenderName,policyDetails,vehicleAdaptation,vehicleCargoTypeName,coverPay,vehicleCoverageName,feePay,vehicleInternalNumber,vehicleMaker,vehicleModel,vehicleMotor,netPay,certificate,vehiclePlates,vehicleSerial,vehicleStatusName,vehicleSubgroup,taxPay,totalAmount,vehicleType,vehicleUnitType,vehicleUseName,validityStartDate,vehicleVersion';
        this._policyInsuredService.getPolicyInsured(contactId, policyId, policyInsuredId, fields).subscribe((res: Insured) => {
            this.insured = res;
        });
    }
}
