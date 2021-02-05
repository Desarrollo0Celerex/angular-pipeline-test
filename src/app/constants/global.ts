// Default values
export const DEFAULT_PHONE_CODE_ID: number = 1;
export const DEFAULT_COUNTRY_ID: number = 1;
export const DEFAULT_ROLE_ID: number = 1;
export const DEFAULT_CONTACT_SOURCE_ID: number = 1;

// Validations
export const ALPHANUMERICS: string = 'a-zA-Z0-9ñÑ';
export const PUNCTUATION_MARKS: string = 'áéíóúÁÉÍÓÚ,.:;\\-\\"()¿?¡!]*$';
export const REAL_NAME_LENGTH: any = {
    MIN: 3,
    MAX: 150
}
export const BRAND_NAME_LENGTH: any = {
    MIN: 3,
    MAX: 150
}
export const OWN_NAME_LENGTH: any = {
    MIN: 3,
    MAX: 75
}
export const WEB_LINK_LENGTH: any = {
    MIN: 10,
    MAX: 100
}
export const EMAIL_LENGTH: any = {
    MIN: 3,
    MAX: 100
}
export const FREE_TEXT_LENGTH: any = {
    MIN: 3,
    MAX: 1000
}

// Dropify
export const IMAGE_FORMATS: string[] = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];

// Status
export const WORKSPACE_STATUS: any = {
    CREATED: 1,
    AVATAR_UPLOADED: 2,
    COMPLETED: 3
}
export const INVITATION_STATUS: any = {
    PENDING: 1,
    ACCEPTED: 2,
    REJECTED: 3,
    DELETED: 4
}

// Types
export const CONTENT_TYPES: any = {
    LEAD: 1,
    CLIENT: 2,
    PAYMENT: 3,
    SINISTER: 4
}

export const CONTACT_TYPES: any = {
    PERSON: 1,
    COMPANY: 2
}
