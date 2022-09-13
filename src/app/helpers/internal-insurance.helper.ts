import { INSURANCES, INTERNAL_INSURANCES } from '@constants/global';

export class InternalInsuranceHelper {

    static calculateInternalInsuranceId(insuranceId: number): number {
        let internalInsuranceId: number;
        switch(insuranceId) {
            case INSURANCES.LIVE:
            case INSURANCES.RETIRE:
            case INSURANCES.HEALTH:
            case INSURANCES.ACCIDENTS:
            case INSURANCES.CARE:
            case INSURANCES.PETS:
            case INSURANCES.CRISIS:
            case INSURANCES.TRAVEL:
            case INSURANCES.DEATH:
            case INSURANCES.CREDIT:
            case INSURANCES.WARRANTY:
            case INSURANCES.SCHOOLAR:
            case INSURANCES.FIANCE:
                internalInsuranceId = INTERNAL_INSURANCES.PERSON;
            break;

            case INSURANCES.CAR:
            case INSURANCES.MOTORBIKE:
            case INSURANCES.BIKE:
                internalInsuranceId = INTERNAL_INSURANCES.VEHICLE;
            break;

            case INSURANCES.HOME:
            case INSURANCES.BUILDING:
            case INSURANCES.FARM:
                internalInsuranceId = INTERNAL_INSURANCES.BUILDING;
            break;

            case INSURANCES.CIVIL:
            case INSURANCES.TECHNICAL:
            case INSURANCES.CAUTION:
            case INSURANCES.TERRESTRIAL:
            case INSURANCES.TRANSPORT:
            case INSURANCES.AERO:
                internalInsuranceId = INTERNAL_INSURANCES.OBJECT;
            break;

            default:
                internalInsuranceId = INTERNAL_INSURANCES.GENERIC;
        }
        return internalInsuranceId;
    }
}
