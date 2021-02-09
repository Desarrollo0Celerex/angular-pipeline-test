import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceCategory } from '@interfaces/insurance-category.interface';

export interface InsurancesByCategory extends InsuranceCategory {
    insurances: Insurance[]
}
