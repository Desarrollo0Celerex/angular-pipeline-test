import * as moment from 'moment';

export class FormatterHelper {
    static formatAmount(
        amount: string | number,
        currencyName: string | null = null
    ): string {
        const currency = Intl.NumberFormat('es-MX');
        const formattedAmount = currency.format(parseFloat(amount.toString()));
        return `$${formattedAmount} ${currencyName ? currencyName : ''}`;
    }

    static formatPersonTitularName(name: string): string {
        const nameArray = name.split(' ');
        if (nameArray.length > 1) {
            return nameArray[0] + ' ' + nameArray[1].charAt(0) + '.';
        }
        return name;
    }

    static formatPhone(phoneCode: string, phoneNumber: string): string {
        return phoneCode && phoneNumber ? `+${phoneCode}${phoneNumber}` : '';
    }

    static formatShortDate(date: string): string {
        return moment(date).format('DD/MM/YYYY');
    }

    static formatWhatsappLink(phoneNumber: string, message: string): string {
        return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURI(
            message
        )}`;
    }
}
