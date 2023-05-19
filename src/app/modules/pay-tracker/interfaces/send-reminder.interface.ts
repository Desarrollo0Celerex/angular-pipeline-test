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
    totalReceips: number;
    titularName: string;
    insuranceTypeName: string;
    insurerShortName: string;
    validityStartDate: string;
    validityEndDate: string;
    paymentPlanName: string;
    workspaceCollectionWhatsappCode: string;
    workspaceCollectionWhatsappNumber: string;
    workspaceCollectionPhoneCode: string;
    workspaceCollectionPhoneNumber: string;
    workspaceCollectionEmail: string;
    insurerId: number;
    insuranceName: string;
    paymentStatusName: string;
}
