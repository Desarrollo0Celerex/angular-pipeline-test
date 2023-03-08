// Validations
export const ALPHANUMERICS: string = '&a-zA-Z0-9ñÑ';
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
    MIN: 2,
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
export const MULTITEXT_LENGTH: any = {
    MIN: 1,
    MAX: 1000
}
export const SHORT_ALPHANUMERIC_LENGTH: any = {
    MIN: 1,
    MAX: 20
}
export const LONG_ALPHANUMERIC_LENGTH: any = {
    MIN: 1,
    MAX: 50
}
export const FILE_NAME_LENGTH: any = {
    MIN: 1,
    MAX: 50
}
export const TITULAR_NAME_LENGTH: any = {
    MIN: 2,
    MAX: 200
}
export const AGENT_NUMBER_LENGTH: any = {
    MIN: 5,
    MAX: 11
}

export const FORMAT_TYPES: any = {
    PDF: 1,
    XLSX: 2
}

export const LICENSES: any = {
    LITE: 1,
    PRO: 2,
    MAX: 3
}

// Dropify
export const IMAGE_FORMATS: string[] = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
export const DOCUMENT_FORMATS: string[] = ['pdf'];
export const FILE_ALL_FORMATS: string[] = ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'mail', 'eml', 'doc', 'docx', 'txt', 'csv', 'xls', 'xlsx', 'zip', 'rar'];
export const IMAGE_AND_DOCUMENT_FORMATS: string[] = ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'bmp'];

// Status
export const WORKSPACE_STATUS: any = {
    CREATED: 1,
    COMPLETED: 2
}
export const INVITATION_STATUS: any = {
    PENDING: 1,
    ACCEPTED: 2,
    REJECTED: 3,
    DELETED: 4
}
export const QUOTATION_STATUS: any = {
    PENDING: 1,
    ACCEPTED: 2,
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
export const POLICY_INSURED_STATUS: any = {
    CURRENT: 1,
    FINISHED: 2,
    CANCELLED: 3
}
export const POLICY_STATUS_ACTIVE: number = 100;
export const PAYMENT_STATUS: any = {
    INTIME: 1,
    PENDING: 2,
    LATE: 3,
    OVERDUE: 4,
    PAID: 5,
    STANDBY: 6
}
export const PAYMENT_PLANS: any = {
    SINGLE_PAYMENT: 1,
    ANNUAL: 5,
}
export const SINISTER_STATUS: any = {
    RECENT: 1,
    PENDING: 2,
    UNFINISHED: 3,
    CONFLICTIVE: 4,
    FINISHED: 5
}
export const SINISTER_STATUS_OPEN: number = 100;
export const SINISTER_EVENT_TYPES: any = {
    OTHER_MOVEMENTS: 1,
    WORKSHOP_AND_SERVICE: 2,
    CIVIL_WORK: 3,
    CRANES_AND_TRANSFER: 4,
    LEGAL_PROCESS: 5,
    INDEMNIFICATION: 6
}
export const EXTERNAL_POLICY_STATUS: any = {
    INCOMPLETE: 1,
    CURRENT: 2,
    EXPIRED: 3,
    CANCELLED: 4
}
export const LEAD_STATUS: any = {
    NEW: 1,
    RECURRENT: 2,
    RECOVERED: 3,
    DISCARDED: 4
}
export const CLIENT_STATUS: any = {
    OCCASIONAL: 1,
    FREQUENT: 2,
    INFLUENTIAL: 3,
    LOST: 4
}
export const PARTNER_STATUS: any = {
    OCCASIONAL: 1,
    FREQUENT: 2,
    INFLUENTIAL: 3,
    INACTIVE: 4
}
export const POLICY_SOURCES: any = {
    NEW: 1,
    RENEWAL: 2,
    REISSUE: 3,
    HISTORY: 4
}
export const GROUP_STATUS: any = {
    COPORATE: 1,
    FAMILY: 2,
    MIXED: 3,
    INCOMPLETE: 4
}
export const WORKSPACE_DIRECTORY_TYPES: any = {
    ADVISORY: 1,
    PAYMENTS: 2,
    SINISTERS: 3,
    SUPPORT: 4
}

// Types
export const CONTENT_TYPES: any = {
    CONTACT: {
        ID: 1,
        NAME: 'Contacto'
    },
    LEAD: {
        ID: 2,
        NAME: 'Prospecto'
    },
    CLIENT: {
        ID: 3,
        NAME: 'Cliente'
    },
    PAYMENT: {
        ID: 4,
        NAME: 'Recibo'
    },
    SINISTER: {
        ID: 5,
        NAME: 'Siniestro'
    },
    CONTACT_QUOTATION: {
        ID: 6,
        NAME: 'Cotización'
    },
    POLICY: {
        ID: 7,
        NAME: 'Póliza'
    },
    CONTACT_SINISTER: {
        ID: 8,
        NAME: 'Siniestro'
    },
    HISTORY_POLICY: {
        ID: 9,
        NAME: 'Movimiento'
    },
    PAYMENT_HISTORY: {
        ID: 10,
        NAME: 'Pago'
    },
    SINISTER_HISTORY: {
        ID: 11,
        NAME: 'Movimiento',
        CONTENT_SUBTYPE: 1,
        CONTENT_SUBTYPE_NAME: 'Registrado'
    },
    POLICY_SINISTERS: {
        ID: 12,
        NAME: 'Siniestro'
    },
    CONTACT_FILE: {
        ID: 13,
        NAME: 'Archivo'
    },
    PENDING_RECEIP: {
        ID: 14,
        NAME: 'Recibo'
    },
    PARTNER: {
        ID: 15,
        NAME: 'Socio'
    },
    POLICY_ENDORSEMENTS_HISTORY: {
        ID: 16,
        NAME: 'Endoso'
    },
    POLICY_TRACKER: {
        ID: 17,
        NAME: 'Renovación'
    },
    GROUP: {
        ID: 18,
        NAME: 'Grupo'
    },
    GROUP_MEMBER: {
        ID: 19,
        NAME: 'Miembro'
    },
    GROUP_POLICY: {
        ID: 20,
        NAME: 'Póliza'
    },
    GROUP_SINISTER: {
        ID: 21,
        NAME: 'Siniestro'
    },
    COINCIDENCES: {
        ID: 22,
        NAME: 'Coincidencia'
    },
    PAYMENT_CALENDAR: {
        ID: 23,
        NAME: 'Pago'
    },
    POLICY_TO_RENEW: {
        ID: 24,
        NAME: 'Renovación'
    },
    LAST_CANCELLED_POLICY: {
        ID: 25,
        NAME: 'Póliza'
    },
    PARTNER_CLIENT: {
        ID: 26,
        NAME: 'Cliente'
    },
    PARTNER_POLICY: {
        ID: 27,
        NAME: 'Póliza'
    },
    PARTNER_SINISTER: {
        ID: 28,
        NAME: 'Siniestro'
    },
    QUOTATIONS_BY_RANGE: {
        ID: 29,
        NAME: 'Cotización'
    },
    ACTIVE_POLICIES_BY_RANGE: {
        ID: 30,
        NAME: 'Póliza'
    },
    PENDING_PAYMENTS_BY_RANGE: {
        ID: 31,
        NAME: 'Recibo'
    },
    INCOMPLETE_POLICIES: {
        ID: 32,
        NAME: 'Póliza'
    },
    EXTERNAL_POLICIES: {
        ID: 33,
        NAME: 'Póliza'
    },
    OPENED_SINISTERS_BY_RANGE: {
        ID: 34,
        NAME: 'Siniestro'
    },
    RENEWED_POLICIES_BY_RANGE: {
        ID: 35,
        NAME: 'Renovación'
    },
    RECEIPTS_APPLIED_BY_RANGE: {
        ID: 36,
        NAME: 'Recibo'
    },
    INSURANCE_SINISTERS_BY_RANGE: {
        ID: 37,
        NAME: 'Siniestro'
    },
    POLICY_INSURED: {
        ID: 38,
        NAME: 'Certificado'
    },
    CONTACT_PENDING_PAYMENTS_BY_RANGE: {
        ID: 39,
        NAME: 'Recibo'
    },
    CONTACT_RECEIPTS_APPLIED_BY_RANGE: {
        ID: 40,
        NAME: 'Recibo'
    },
    CONTACT_PENDING_RENEWALS_BY_RANGE: {
        ID: 41,
        NAME: 'Renovación'
    },
    CONTACT_APPLIED_RENEWALS_BY_RANGE: {
        ID: 42,
        NAME: 'Renovación'
    },
    INSURANCE: {
        ID: 43,
        NAME: 'Seguro'
    },
    POLICY_OPEN_SINISTERS: {
        ID: 44,
        NAME: 'Siniestro'
    },
    POLICY_CLOSED_SINISTERS: {
        ID: 45,
        NAME: 'Siniestro'
    },
    POLICY_RECEIPTS_PAID: {
        ID: 46,
        NAME: 'Recibo'
    },
    POLICY_RENEWAL_HISTORY: {
        ID: 47,
        NAME: 'Renovación'
    },
    WORKSPACE_POLICIES_PENDING: {
        ID: 48,
        NAME: 'Póliza'
    },
    WORKSPACE_QUOTATIONS_CLOSED_BY_RANGE: {
        ID: 49,
        NAME: 'Cotización'
    },
    WORKSPACE_SINISTERS_CLOSED_BY_RANGE: {
        ID: 50,
        NAME: 'Siniestro'
    },
    WORKSPACE_POLICIES_ISSUED_BY_RANGE: {
        ID: 51,
        NAME: 'Póliza'
    },
    WORKSPACE_LEADS_CONVERTED_BY_RANGE: {
        ID: 52,
        NAME: 'Prospecto'
    },
    WORKSPACE_CLIENTS_CONVERTED_BY_RANGE: {
        ID: 53,
        NAME: 'Cliente'
    },
    WORKSPACE_QUOTATIONS_OPENED_BY_RANGE: {
        ID: 54,
        NAME: 'Cotización'
    },
}
export const CONTACT_TYPES: any = {
    PERSON: 1,
    COMPANY: 2
}
export const CONTACT_INFORMATION_TYPES: any = {
    MAIN: 1,
    ISSUES: 2,
    PAYMENTS: 3,
    SINISTERS: 4,
}
export const BUTTON_TYPES: any = {
    TEXT: 1,
    TEXT_WITH_ICON: 2,
    ICON: 3,
    INPUT: 4
}
export const FILE_TYPES: any = {
    IMAGE: 1,
    DOCUMENT: 2,
    MIXED: 3,
    IMAGE_AND_DOCUMENT: 4
}
export const ENDORSEMENT_TYPES: any = {
    A: 1,
    B: 2,
    C: 3,
    D: 4
}
export const ACTION_TYPES: any = {
    CREATE_QUOTATION: 1,
    CREATE_POLICY: 2,
    SELECT_CONTACT: 3,
    RENEW_POLICY: 4,
    REISSUE_POLICY: 5
}
export const INSURANCE_LIST_TYPES: any = {
    BY_CATEGORY: 1,
    BY_GROUP: 2,
    BY_SEARCH: 3
}
export const POLICY_RECORD_TYPES: any = {
    REGISTER: 1,
    UPLOAD: 2,
    CONFIRMATION: 3,
    UPDATE: 4,
    ENDORSEMENT: 5,
    RENEWED: 6,
    REISSUED: 7,
    CANCELLED: 8,
    SINISTER: 9,
    RENOVATED: 10,
    REISSUED_OLD: 11
}
export const CONTACT_PROFILE_PAGE_TYPES: any = {
    QUOTATIONS: {
        ID: 1,
        ROUTE: 'list-quotations'
    },
    POLICIES: {
        ID: 2,
        ROUTE: 'list-policies'
    },
    SINISTERS: {
        ID: 3,
        ROUTE: 'list-sinisters'
    },
    CONTACT_INFORMATION: {
        ID: 4,
        ROUTE: 'show-contact-data'
    }
}
export const SINISTER_RECORD_TYPES: any = {
    REGISTER: 1,
    UPDATE: 2,
    FINISHED: 3,
    REACTIVATED: 4,
    NEW_EVENT: 5,
    UPDATE_CERTIFICATE: 6,
    UPDATE_EVIDENCE: 7,
    UPDATE_REPORT: 8,
    UPDATE_TRACKING: 9,
    UPDATE_DETAILS: 10
}
export const CONTACT_SOURCE_TYPES: any = {
    PARTNERS: 4
}

export const IGNORE_MATCHES: any = {
    YES: true,
    NO: false
}
export const ENDORSEMENT_PAYMENT_METHODS: any = {
    POLICY_RECEIPTS: 1,
    INDEPENDENT_RECEIPTS: 2,
    SINGLE_RECEIPT: 3
}
export const ROLES: any = {
    GLOBAL_ADMIN: 1,
    WALLET_MANAGER: 2,
    SALES_MANAGER: 3,
    SINISTER_MANAGER: 4,
    MARKETING_MANAGER: 5,
    INSURANCE_ADVISOR: 6,
    DATA_ANALYST: 7
}
export const INSURANCE_GROUPS: any = {
    PEOPLE: 1,
    VEHICLES: 2,
    BUILDINGS: 3,
    MERCHANDISE: 4,
    OBJECTS: 5,
    RC: 6
}
export const INSURANCES: any = {
    LIVE: 1,
    RETIRE: 2,
    HEALTH: 3,
    ACCIDENTS: 4,
    CARE: 5,
    PETS: 11,
    CRISIS: 12,
    TRAVEL: 14,
    DEATH: 15,
    CREDIT: 17,
    WARRANTY: 18,
    SCHOOLAR: 19,
    FIANCE: 20,

    CAR: 6,
    MOTORBIKE: 7,
    BIKE: 8,
    TERRESTRIAL: 25,

    HOME: 9,
    BUILDING: 10,
    FARM: 28,

    CIVIL: 22,
    TECHNICAL: 23,
    CAUTION: 24,
    TRANSPORT: 26,
    AERO: 27

}

export const INSURANCE_TYPES: any = {
    PERSONAL: 1,
    INDIVIDUAL: 2,
    GROUP: 3,
    COLLECTIVE: 4,
    FLOTILLA: 5
}

export const INTERNAL_INSURANCES: any = {
    PERSON: 1,
    VEHICLE: 2,
    BUILDING: 3,
    OBJECT: 4,
    GENERIC: 5
}

export const CANCELLATION_REASONS: any = {
    CAPTURE_ERROR: 9
}
export const PERIODS: any = {
    LAST_YEAR: 1,
    LAST_MONTH: 2
}

export const PERIOD_STATUS: any = {
    SELECTED: 0,
    COMPARED: 1
};

export const SLACK_UNITS: number = 10;
export const SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY: any = {
    GLOBAL_ADMIN: 600,
    OTHERS: 40
}
export const SLACK_DAYS_TO_LOAD_A_EXPIRED_POLICY: number = 30;

// Default values
export const DEFAULT_PHONE_CODE_ID: number = 1;
export const DEFAULT_COUNTRY_ID: number = 1;
export const DEFAULT_ROLE_ID: number = 1;
export const DEFAULT_CONTACT_SOURCE_ID: number = 1;
export const DEFAULT_CONTENT_FILTER_ID: number = 1;
export const DEFAULT_CURRENCY_ID: number = 1;
export const DEFAULT_POLICY_STATUS_ID: number = POLICY_STATUS_ACTIVE;
export const DEFAULT_POLICY_CANCELLATION_REASON_ID: number = 1;
export const DEFAULT_PAGE: number = 1;
export const DEFAULT_PER_PAGE: number = 12;
export const DEFAULT_PAYMENT_METHOD_ID: number = 1;
