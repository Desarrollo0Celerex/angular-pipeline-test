export interface CreateContactRequestBody {
    name?: string;
    namePaternal?: string;
    nameMaternal?: string;
    companyName?: string;
    brandName?: string;
    email?: string;
    phoneCodeId?: number;
    phoneNumber?: string;
    contactSourceId: number;
    contactSourceTypeId: number;
    countryId: number;
    stateId: number;
    contactTypeId: number;
    ignoreMatches: boolean;
}
