import { Injectable } from '@angular/core';

import { Insured } from '@interfaces/insured.interface';
import { PolicyInsuredService } from '@services/policy-insured.service';

@Injectable()
export class ContainerInsuredDetailsService {
    insured: Insured | null = null;

    constructor(private _policyInsuredService: PolicyInsuredService) { }

    loadInsured(contactId: string, policyId: string, policyInsuredId: string): void {
        const fields: string = 'insuranceId,insuranceTypeId,buildingLocation,buildingName,buildingUsage,objectDescription,objectName,objectUsage,personAge,personName,personGenderName,policyDetails,vehicleAdaptation,vehicleCargoTypeName,vehicleCoverPay,vehicleCoverageName,vehicleFeePay,vehicleInternalNumber,vehicleMaker,vehicleModel,vehicleMotor,vehicleNetPay,vehicleNumber,vehiclePlates,vehicleSerial,vehicleStatusName,vehicleSubgroup,vehicleTaxPay,vehicleTotalAmount,vehicleType,vehicleUnitType,vehicleUseName,vehicleValidityStartDate,vehicleVersion';
        this._policyInsuredService.getPolicyInsured(contactId, policyId, policyInsuredId, fields).subscribe((res: Insured) => {
            this.insured = res;
        });
    }
}
