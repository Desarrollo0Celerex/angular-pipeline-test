import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneCode',
    standalone: false
})
export class PhoneCodePipe implements PipeTransform {
    transform(phoneCodeId: string): string {
        let phoneCode = '';
        switch (parseInt(phoneCodeId)) {
            case 1:
                phoneCode = '52';
                break;
            case 2:
                phoneCode = '54';
                break;
            case 3:
                phoneCode = '57';
                break;
            case 4:
                phoneCode = '56';
                break;
            case 5:
                phoneCode = '593';
                break;
            case 6:
                phoneCode = '595';
                break;
            case 7:
                phoneCode = '505';
                break;
            case 8:
                phoneCode = '598';
                break;
            case 9:
                phoneCode = '51';
                break;
            case 10:
                phoneCode = '591';
                break;
            case 11:
                phoneCode = '506';
                break;
            case 12:
                phoneCode = '53';
                break;
            case 13:
                phoneCode = '503';
                break;
            case 14:
                phoneCode = '502';
                break;
            case 15:
                phoneCode = '504';
                break;
            case 16:
                phoneCode = '507';
                break;
            case 17:
                phoneCode = '1';
                break;
            case 18:
                phoneCode = '1';
                break;
            case 19:
                phoneCode = '58';
                break;
            case 20:
                phoneCode = '34';
                break;
            case 21:
                phoneCode = '240';
                break;
        }
        return phoneCode;
    }
}
