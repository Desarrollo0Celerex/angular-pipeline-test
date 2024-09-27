import { CalculateFirstPaymentAmount } from './calculate-first-payment-amount.interface';

export interface CalculatePaymentAmount extends CalculateFirstPaymentAmount {
    firstReceiptAmount: number;
    subsequentReceiptsAmount: number;
    paymentSourceTypeId: number;
    tickets: number;
    paymentPlanId: number;
    pendingAmount: number;
    pendingReceipts: number;
}
