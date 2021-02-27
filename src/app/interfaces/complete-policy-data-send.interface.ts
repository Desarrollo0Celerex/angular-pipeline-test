export interface CompletePolicyDataSend {
    coveredProperty: string,
    policyNumber: string,
    clientNumber: string,
    emissionDate: string,
    validityStartDate: string,
    validityEndDate: string,
    titularName: string,
    titularRfc: string,
    titularPostalCode: string,
    titularPhoneNumber: string,
    amount: string,
    currencyId: number,
    paymentMethodId: number,
    paymentPlanId: number,
    bills: number
}
