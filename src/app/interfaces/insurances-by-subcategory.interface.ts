import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceSubcategory } from '@interfaces/insurance-subcategory.interface';

export interface InsurancesBySubcategory extends InsuranceSubcategory {
    insurances: Insurance[]
}
