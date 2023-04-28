export interface CreateScannerLogDataSend {
    insurerId: number,
    insuranceId: number,
    insuranceTypeId: number,
    totalMissingFields: number,
    missingFields: string,
    policyUrl: string
}
