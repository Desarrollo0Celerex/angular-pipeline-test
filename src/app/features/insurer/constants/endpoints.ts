import { environment } from '@env/environment';

export const INSURER_ENDPOINTS = {
    countryInsurers: (countryId: number) =>
        `${environment.agenthos.apiUrl}/countries/${countryId}/insurers`,
    insurers: environment.agenthos.apiUrl + '/insurers',
};
