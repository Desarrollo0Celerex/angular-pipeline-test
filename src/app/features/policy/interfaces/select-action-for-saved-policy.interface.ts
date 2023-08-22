export interface SelectActionForSavedPolicy {
    isSavedPolicy: boolean;
    contactId: string;
    policyId: string;
    paymentId: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    cancelRoute: string | [];
}
