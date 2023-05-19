import { Insurance } from '@interfaces/insurance.interface';

export interface LicenseInsurance extends Insurance {
    hasActiveLeadGenerator: boolean,
}
