import { INSURANCE_TYPES } from '@constants/global';

export class PolicyInsuredHelper {

    static checkAreSeveralInsured(insuranceTypeId: number): boolean {
        return (
            insuranceTypeId == INSURANCE_TYPES.GROUP || 
            insuranceTypeId == INSURANCE_TYPES.COLLECTIVE ||
            insuranceTypeId == INSURANCE_TYPES.FLOTILLA
        ) ? true : false;
    }
}