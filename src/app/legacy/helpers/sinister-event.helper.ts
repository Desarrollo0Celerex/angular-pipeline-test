import moment from 'moment';

import { SINISTER_EVENT_TYPES } from '@constants/global';
import { SinisterLog } from '@interfaces/sinister-log.interface';

export class SinisterEventHelper {
    static generateSinisterEventDetails(sinisterLog: SinisterLog): string {
        let eventDetails: string = '';
        const currency = Intl.NumberFormat('es-MX');
        sinisterLog.sinisterEventTypeId = !!sinisterLog.sinisterEventTypeId
            ? parseInt(sinisterLog.sinisterEventTypeId.toString())
            : 0;
        sinisterLog.providerDate = !!sinisterLog.providerDate
            ? moment(sinisterLog.providerDate).format('DD/MM/YYYY')
            : '';
        sinisterLog.providerBill = !!sinisterLog.providerBill
            ? currency.format(parseFloat(sinisterLog.providerBill))
            : '';
        switch (sinisterLog.sinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.WORKSHOP_AND_SERVICE:
                if (!!sinisterLog.providerName) {
                    eventDetails +=
                        'Se asigna responsable de taller con nombre: ' +
                        sinisterLog.providerName;
                }
                if (!!sinisterLog.providerDate) {
                    eventDetails += ', el día: ' + sinisterLog.providerDate;
                }
                if (!!sinisterLog.providerFolio) {
                    eventDetails +=
                        ', con número de servicio: ' +
                        sinisterLog.providerFolio;
                }
                if (
                    !!sinisterLog.providerName ||
                    !!sinisterLog.providerDate ||
                    !!sinisterLog.providerFolio
                ) {
                    eventDetails += '. ';
                }
                if (
                    !!sinisterLog.providerPhoneNumber ||
                    !!sinisterLog.providerEmail
                ) {
                    eventDetails += 'Datos de Contacto: ';
                    if (!!sinisterLog.providerPhoneNumber) {
                        eventDetails += sinisterLog.providerPhoneNumber;
                        if (!!sinisterLog.providerEmail) {
                            eventDetails += ', ';
                        }
                    }
                    if (!!sinisterLog.providerEmail) {
                        eventDetails += sinisterLog.providerEmail;
                    }
                    eventDetails += '.';
                }
                break;

            case SINISTER_EVENT_TYPES.CIVIL_WORK:
                if (!!sinisterLog.providerName) {
                    eventDetails +=
                        'Se asigna responsable de constructora con nombre: ' +
                        sinisterLog.providerName;
                }
                if (!!sinisterLog.providerDate) {
                    eventDetails += ', el día: ' + sinisterLog.providerDate;
                }
                if (!!sinisterLog.providerFolio) {
                    eventDetails +=
                        ', con número de servicio: ' +
                        sinisterLog.providerFolio;
                }
                if (!!sinisterLog.providerBill) {
                    eventDetails +=
                        ', el cual tiene un costo aproximado de: ' +
                        sinisterLog.providerBill;
                }
                if (
                    !!sinisterLog.providerName ||
                    !!sinisterLog.providerDate ||
                    !!sinisterLog.providerFolio ||
                    !!sinisterLog.providerBill
                ) {
                    eventDetails += '. ';
                }
                if (
                    !!sinisterLog.providerPhoneNumber ||
                    !!sinisterLog.providerEmail
                ) {
                    eventDetails += 'Datos de Contacto: ';
                    if (!!sinisterLog.providerPhoneNumber) {
                        eventDetails += sinisterLog.providerPhoneNumber;
                        if (!!sinisterLog.providerEmail) {
                            eventDetails += ', ';
                        }
                    }
                    if (!!sinisterLog.providerEmail) {
                        eventDetails += sinisterLog.providerEmail;
                    }
                    eventDetails += '.';
                }
                break;

            case SINISTER_EVENT_TYPES.CRANES_AND_TRANSFER:
                if (!!sinisterLog.providerName) {
                    eventDetails +=
                        'Se asigna servicio de grúas con nombre: ' +
                        sinisterLog.providerName;
                }
                if (!!sinisterLog.providerDate) {
                    eventDetails += ', el día: ' + sinisterLog.providerDate;
                }
                if (!!sinisterLog.providerFolio) {
                    eventDetails +=
                        ', con número de servicio: ' +
                        sinisterLog.providerFolio;
                }
                if (!!sinisterLog.providerBill) {
                    eventDetails +=
                        ', el cual tiene un costo aproximado de: ' +
                        sinisterLog.providerBill;
                }
                if (
                    !!sinisterLog.providerName ||
                    !!sinisterLog.providerDate ||
                    !!sinisterLog.providerFolio ||
                    !!sinisterLog.providerBill
                ) {
                    eventDetails += '. ';
                }
                if (
                    !!sinisterLog.providerPhoneNumber ||
                    !!sinisterLog.providerEmail
                ) {
                    eventDetails += 'Datos de Contacto: ';
                    if (!!sinisterLog.providerPhoneNumber) {
                        eventDetails += sinisterLog.providerPhoneNumber;
                        if (!!sinisterLog.providerEmail) {
                            eventDetails += ', ';
                        }
                    }
                    if (!!sinisterLog.providerEmail) {
                        eventDetails += sinisterLog.providerEmail;
                    }
                    eventDetails += '.';
                }
                break;

            case SINISTER_EVENT_TYPES.LEGAL_PROCESS:
                if (!!sinisterLog.providerName) {
                    eventDetails +=
                        'Se asigna abogado con nombre: ' +
                        sinisterLog.providerName;
                }
                if (!!sinisterLog.providerDate) {
                    eventDetails += ', el día: ' + sinisterLog.providerDate;
                }
                if (!!sinisterLog.providerFolio) {
                    eventDetails +=
                        ', con la carpeta de investigación no: ' +
                        sinisterLog.providerFolio;
                }
                if (!!sinisterLog.providerBill) {
                    eventDetails +=
                        ', el cual tiene un costo aproximado de: ' +
                        sinisterLog.providerBill;
                }
                if (
                    !!sinisterLog.providerName ||
                    !!sinisterLog.providerDate ||
                    !!sinisterLog.providerFolio ||
                    !!sinisterLog.providerBill
                ) {
                    eventDetails += '. ';
                }
                if (
                    !!sinisterLog.providerPhoneNumber ||
                    !!sinisterLog.providerEmail
                ) {
                    eventDetails += 'Datos de Contacto: ';
                    if (!!sinisterLog.providerPhoneNumber) {
                        eventDetails += sinisterLog.providerPhoneNumber;
                        if (!!sinisterLog.providerEmail) {
                            eventDetails += ', ';
                        }
                    }
                    if (!!sinisterLog.providerEmail) {
                        eventDetails += sinisterLog.providerEmail;
                    }
                    eventDetails += '.';
                }
                break;

            case SINISTER_EVENT_TYPES.INDEMNIFICATION:
                if (!!sinisterLog.providerDate) {
                    eventDetails +=
                        'Se efectúa indemnización del siniestro el día: ' +
                        sinisterLog.providerDate;
                }
                if (!!sinisterLog.providerBill) {
                    eventDetails +=
                        ', por un monto de: ' + sinisterLog.providerBill;
                }
                if (!!sinisterLog.currencyName) {
                    eventDetails += ', moneda: ' + sinisterLog.currencyName;
                }
                if (!!sinisterLog.paymentMethodName) {
                    eventDetails +=
                        ', con forma de pago: ' + sinisterLog.paymentMethodName;
                }
                eventDetails += '.';
                break;
        }
        return eventDetails;
    }
}
