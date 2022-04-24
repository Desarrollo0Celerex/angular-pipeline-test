export interface ReceiptPaid {
    receiptPaidId: string,
    createdAt: string,
    applicationDate: string,
    receiptsAmount: string,
    receiptsNumber: string,
    createdByName: string,
    currencyName: string,
    paymentId: string,
    policyNumber: string,
    paymentPlanName: string,
    validityStartDate: string,
    validityEndDate: string,
    paymentTypeId: number,
    paymentReference: string,
    paymentEvidenceUrl: string
}
