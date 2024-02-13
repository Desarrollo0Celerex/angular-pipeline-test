export const POLICY_ROUTES = {
    completePolicy: (contactId: string, policyId: string) =>
        `workspace/policies/complete-policy/${contactId}/${policyId}`,
    cancelPolicy: (contactId: string, policyId: string) =>
        `workspace/policies/cancel-policy/${contactId}/${policyId}`,
    policyRecord: (contactId: string, policyId: string) =>
        `workspace/policies/history-policy/${contactId}/${policyId}`,
    policyTracker: (contactId: string, policyId: string) =>
        `workspace/renewals/policy-renewals-applied/${contactId}/${policyId}`,
    updatePolicy: (contactId: string, policyId: string) =>
        `workspace/policies/update-policy/${contactId}/${policyId}`,
};
