export const RENEWAL_ROUTES = {
    policyRenewalsRecord: (contactId: string, policyId: string) =>
        `workspace/renewals/policy-renewal-history/${contactId}/${policyId}`,
};
