export interface Partner {
    partnerId: string,
    name: string,
    createdAt?: string,
    partnerStatusName?: string,
    partnerStatusBackground?: string,
    totalClients?: number,
    totalPolicies?: number,
    wallet?: number,
    walletPaid?: number,
    currencyName?: string
}
