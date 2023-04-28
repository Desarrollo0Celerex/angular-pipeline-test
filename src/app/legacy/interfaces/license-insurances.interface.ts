import { LicenseInsurance } from '@interfaces/license-insurance.interface';
import { License } from '@interfaces/license.interface';

export interface LicenseInsurances extends License {
    insurances: LicenseInsurance[]
}
