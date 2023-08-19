import { SelectShippingChannels } from './select-shipping-channels.interface';

export interface GenerateShippingInformation extends SelectShippingChannels {
    contactPhoneCode: string;
    contactPhoneNumber: string;
    contactEmail: string;
}
