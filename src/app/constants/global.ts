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
export const QUOTATION_STATUS: any = {
    PENDING: 1,
    ACCEPRED: 2,
    REJECTED: 3
}
export const POLICY_STATUS: any = {
    INCOMPLETE: 1,
    ISSUED: 2,
    CURRENT: 3,
    PENDING: 4,
    SUSPENDED: 5,
    FINISHED: 6,
    CANCELLED: 7
}
export const POLICY_STATUS_ACTIVE: number = 100;

// Types
export const CONTENT_TYPES: any = {
    LEAD: {
        ID: 1,
        NAME: 'Prospecto'
    },
    CLIENT: {
        ID: 2,
        NAME: 'Cliente'
    },
    PAYMENT: {
        ID: 3,
        NAME: 'Recibo'
    },
    SINISTER: {
        ID: 4,
        NAME: 'Siniestro'
    },
    CONTACT_QUOTATION: {
        ID: 5,
        NAME: 'Cotización'
    },
    CONTACT_POLICY: {
        ID: 6,
        NAME: 'Póliza'
    }
}
export const CONTACT_TYPES: any = {
    PERSON: 1,
    COMPANY: 2
}
export const BUTTON_TYPES: any = {
    TEXT: 1,
    TEXT_WITH_ICON: 2,
    ICON: 3,
    INPUT: 4
}
export const FILE_TYPES: any = {
    IMAGE: 1,
    DOCUMENT: 2
}
export const ENDORSEMENT_TYPES: any = {
    PAYMENT_METHOD_CHANGE: 3,
    POLICY_REHABILITATION: 5
}

// Default values
export const DEFAULT_PHONE_CODE_ID: number = 1;
export const DEFAULT_COUNTRY_ID: number = 1;
export const DEFAULT_ROLE_ID: number = 1;
export const DEFAULT_CONTACT_SOURCE_ID: number = 1;
export const DEFAULT_CONTENT_FILTER_ID: number = 1;
export const DEFAULT_CURRENCY_ID: number = 1;
export const DEFAULT_METHOD_ID: number = 1;
export const DEFAULT_PLAN_ID: number = 1;
export const DEFAULT_POLICY_STATUS_ID: number = POLICY_STATUS_ACTIVE;
export const DEFAULT_ENDORSEMENT_TYPE_ID: number = 1;
