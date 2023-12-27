import { Insurance } from './insurance.interface';

export interface InsuranceCategory {
    insuranceCategoryId: number;
    name: string;
    insurances: Insurance[];
}
