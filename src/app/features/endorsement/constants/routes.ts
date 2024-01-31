export const ENDORSEMENT_ROUTES = {
    policyEndorsementsRecord: (contactId: string, policyId: string) =>
        `workspace/policies/endorsements/history/${contactId}/${policyId}`,
};
