export const SINISTER_ROUTES = {
    policySinistersOpen: (contactId: string, policyId: string) =>
        `workspace/sinisters/policy-open-sinisters/${contactId}/${policyId}`,
    policySinistersClosed: (contactId: string, policyId: string) =>
        `workspace/sinisters/policy-closed-sinisters/${contactId}/${policyId}`,
    policySinistersRecord: (contactId: string, policyId: string) =>
        `workspace/policies/policy-sinisters/${contactId}/${policyId}`,
};
