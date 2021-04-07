export interface PolicyRecord {
    createdAt: string,
    sourceId: string,
    policyRecordTypeId: number;
    policyRecordTypeName: string,
    policyRecordTypeDescription: string,
    policyRecordTypeBackground: string,
    policyRecordTypeIcon: string,
    createdByName: string,
    endorsementTypeName: string,
    endorsementNumber: string,
    insurerName: string,
    policyNumber: string,
    policyCancellationReasonName: string,
    sourceContactId: string
}
