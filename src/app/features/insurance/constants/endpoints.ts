import { environment } from '@env/environment';

export const INSURANCE_ENDPOINTS = {
    categoryInsurances: (insuranceCategoryId: number) =>
        environment.agenthos.apiUrl +
        '/insurance-categories/' +
        insuranceCategoryId +
        '/insurances',
    insuranceCategories: environment.agenthos.apiUrl + '/insurance-categories',
    insurances: environment.agenthos.apiUrl + '/insurances',
};
