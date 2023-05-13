export interface Reminder {
    receiptNumber: number;
    canSendReminderByWallet: boolean;
    canSendReminderByWhatsapp: boolean;
    canSendReminderByEmail: boolean;
    email: string;
    phoneNumber: string;
}
