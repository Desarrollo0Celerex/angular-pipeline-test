export const ENDORSEMENT_ROUTES = {
    createEndorsement: (contactId: string, policyId: string) =>
        `workspace/policies/create-endorsement/${contactId}/${policyId}`,
    policyEndorsementsRecord: (contactId: string, policyId: string) =>
        `workspace/policies/endorsements/history/${contactId}/${policyId}`,
};
