export const PAYMENTS_ROUTES = {
    policyPendingPayments: (
        contactId: string,
        policyId: string,
        paymentId: String
    ) =>
        `workspace/payments/policy-receipts-paid/${contactId}/${policyId}/${paymentId}`,
    policyAppliedPayments: (
        contactId: string,
        policyId: string,
        paymentId: string
    ) =>
        `workspace/payments/pending-receipts/${contactId}/${policyId}/${paymentId}`,
};
