import { PolicyDataSend } from '@interfaces/policy-data-send.interface'

export interface SinisterDataSend extends PolicyDataSend {
    sinisterId: string
}
