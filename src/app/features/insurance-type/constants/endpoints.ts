import { environment } from '@env/environment';

export const INSURANCE_TYPE_ENDPOINTS = {
    insuranceInsuranceTypes: (insuranceId: number) =>
        environment.agenthos.apiUrl +
        '/insurances/' +
        insuranceId +
        '/insuranceTypes',
};
