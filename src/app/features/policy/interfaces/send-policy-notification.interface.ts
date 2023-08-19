import { ShippingInformation } from '@shared/interfaces/shipping-information.interface';

export interface SendPolicyNotification {
    workspaceId: string;
    contactId: string;
    policyId: string;
    shippingChannels: ShippingInformation[];
}
