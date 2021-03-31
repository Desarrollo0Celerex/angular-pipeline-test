export interface CreateContactDataSend {
    name?: string,
    namePaternal?: string,
    nameMaternal?: string,
    companyName?: string,
    brandName?: string,
    email?: string,
    phoneCodeId?: number,
    phoneNumber?: string,
    contactSourceId: number,
    contactTypeId: number,
    ignoreMatches: boolean
}
