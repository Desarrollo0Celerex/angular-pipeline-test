export enum CALENDARS {
    APPLE = 1,
    GOOGLE = 2,
    OUTLOOK = 3,
}

export enum SHIPPING_CHANNELS {
    WHATSAPP = 2,
    EMAIL = 3,
}

export enum SHIPPING_CONTACT_TYPES {
    PHONE = 1,
    EMAIL = 2,
}

export enum SHIPPING_CONTENT_TYPES {
    POLICY = 1,
}

export const CALENDAR_RANGES = {
    LAST_90_DAYS: {
        NAME: 'ÚLTIMOS 90 DÍAS',
        VALUE: -90,
    },
    LAST_60_DAYS: {
        NAME: 'ÚLTIMOS 60 DÍAS',
        VALUE: -60,
    },
    LAST_30_DAYS: {
        NAME: 'ÚLTIMOS 30 DÍAS',
        VALUE: -30,
    },
    LAST_15_DAYS: {
        NAME: 'ÚLTIMOS 15 DÍAS',
        VALUE: -15,
    },
    LAST_7_DAYS: {
        NAME: 'ÚLTIMOS 7 DÍAS',
        VALUE: -7,
    },
    TODAY: {
        NAME: 'HOY',
        VALUE: 0,
    },
    NEXT_7_DAYS: {
        NAME: 'PRÓXIMOS 7 DÍAS',
        VALUE: 7,
    },
    NEXT_15_DAYS: {
        NAME: 'PRÓXIMOS 15 DÍAS',
        VALUE: 15,
    },
    NEXT_30_DAYS: {
        NAME: 'PRÓXIMOS 30 DÍAS',
        VALUE: 30,
    },
    NEXT_60_DAYS: {
        NAME: 'PRÓXIMOS 60 DÍAS',
        VALUE: 60,
    },
    NEXT_90_DAYS: {
        NAME: 'PRÓXIMOS 90 DÍAS',
        VALUE: 90,
    },
};

export enum GENDERS {
    MALE = 1,
    FEMALE = 2,
}

export enum INSURANCES {
    LIFE = 1,
    SAVING = 2,
    HEALTH = 3,
    ACCIDENT = 4,
    CAR = 6,
    MOTORBIKE = 7,
    BIKE = 8,
    HOME = 9,
    BUILDING = 10,
    PET = 11,
    CRISIS = 12,
    OBJECTS = 13,
    TRAVEL = 14,
    DEAD = 15,
    LEGAL = 16,
    CREDIT = 17,
    WARRANTY = 18,
    EDUCATION = 19,
    FIANCE = 20,
    PROFESIONAL = 22,
    TECHNICAL = 23,
    CAUTIONS = 24,
    TRUCK = 25,
    NAVY = 26,
    AERO = 27,
    FARM = 28,
    PICKUP = 29,
    DENTAL = 30,
    ILLNESS = 31,
    RETIRE = 32,
    CARD = 33,
    COMERCIAL = 34,
    LAND = 35,
    DEVICE = 36,
    UNEMPLOYMENT = 37,
    CASH = 38,
    BUS = 39,
    DELIVERY = 40,
    RADIOCTIVE = 41,
    CONTAINER = 42,
    TRAILER = 43,
    CONSTRUCTION = 44,
    MACHIN = 45,
}

export enum PAYMENT_PLANS {
    SINGLE_PAYMENT = 1,
    ANNUAL = 5,
}

export enum PAYMENT_REMINDER_TYPES {
    MANUAL = 1,
}

export enum PAYMENT_SOURCE_TYPES {
    POLICY = 1,
    ENDORSEMENT = 2,
    FRACTION = 3,
}

export enum PAYMENT_STATUS {
    IN_TRANSIT = 1,
    IN_TIME = 2,
    LATE = 3,
    OVERDUE = 4,
    PAID = 5,
    STANDBY = 6,
}

export enum TASK_MODULES {
    PAYMENT = 1,
    OTHER = 2,
    POLICY = 3,
    REISSUE = 4,
}

export enum PHONE_CODES {
    MEXICO = '52',
}

export enum TASK_STATUS {
    PRIORITY = 1,
    DELAYED = 2,
    URGENT = 3,
    EXPIRED = 4,
    STANDBY = 5,
    FINISHED = 6,
}

export enum TASK_PROGRESS_STATUS {
    TODO = 1,
}
