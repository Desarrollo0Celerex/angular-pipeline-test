import { Reminder } from './reminder.interface';

export interface SendReminder extends Reminder {
    contactName: string;
    workspaceName: string;
    policyNumber: string;
    coveredProperty: string;
    insurerName: string;
    paymentAmount: number;
    currencyName: string;
    paymentDate: string;
}
