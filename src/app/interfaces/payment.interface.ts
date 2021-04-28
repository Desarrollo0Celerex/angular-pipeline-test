export interface Payment {
    paymentId: string,
    insurerImageUrl: string,
    paymentSourceTypeName: string,
    paymentStatusName: string,
    paymentStatusBackground: string,
    currencyName: string,
    pendingAmount: number,
    insuranceBackground: string,
    insuranceIcon: string,
    coveredProperty: string,
    paymentAmount: number,
    paymentAmountPaid: number,
    lifeTime: number,
    insuranceName: string,
    policyNumber: string
}
