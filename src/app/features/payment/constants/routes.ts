export const PAYMENT_ROUTES = {
    policyPendingPayments: (
        contactId: string,
        policyId: string,
        paymentId: String
    ) =>
        `workspace/payments/pending-receipts/${contactId}/${policyId}/${paymentId}`,
    policyAppliedPayments: (
        contactId: string,
        policyId: string,
        paymentId: string
    ) =>
        `workspace/payments/policy-receipts-paid/${contactId}/${policyId}/${paymentId}`,
    policyPaymentsRecord: (
        contactId: string,
        policyId: string,
        paymentId: string
    ) =>
        `workspace/payments/payment-history/${contactId}/${policyId}/${paymentId}`,
};
