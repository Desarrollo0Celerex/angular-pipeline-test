import { Pipe, PipeTransform } from '@angular/core';
import { INSURANCES } from '@core/constants/settings';

@Pipe({
    name: 'insuranceIcon',
    standalone: false
})
export class InsuranceIconPipe implements PipeTransform {
    transform(insuranceId: number): string {
        let icon: string;
        switch (insuranceId) {
            case INSURANCES.LIFE:
                icon = 'mdi mdi-account-circle';
                break;
            case INSURANCES.RETIRE:
                icon = 'mdi mdi-chart-line';
                break;
            case INSURANCES.HEALTH:
                icon = 'mdi mdi-heart-pulse';
                break;
            case INSURANCES.ACCIDENT:
                icon = 'mdi mdi-ambulance';
                break;
            case INSURANCES.CAR:
                icon = 'mdi mdi-car-sports';
                break;
            case INSURANCES.MOTORBIKE:
                icon = 'mdi mdi-motorbike';
                break;
            case INSURANCES.BIKE:
                icon = 'mdi mdi-bike';
                break;
            case INSURANCES.HOME:
                icon = 'mdi mdi-home';
                break;
            case INSURANCES.BUILDING:
                icon = 'mdi mdi-domain';
                break;
            case INSURANCES.PET:
                icon = 'mdi mdi-paw';
                break;
            case INSURANCES.CRISIS:
                icon = 'mdi mdi-incognito';
                break;
            case INSURANCES.OBJECTS:
                icon = 'mdi mdi-diamond';
                break;
            case INSURANCES.TRAVEL:
                icon = 'mdi mdi-earth';
                break;
            case INSURANCES.DEAD:
                icon = 'mdi mdi-account-off';
                break;
            case INSURANCES.LEGAL:
                icon = 'mdi mdi-scale-balance';
                break;
            case INSURANCES.CREDIT:
                icon = 'mdi mdi-currency-usd';
                break;
            case INSURANCES.WARRANTY:
                icon = 'mdi mdi-bank';
                break;
            case INSURANCES.EDUCATION:
                icon = 'mdi mdi-school';
                break;
            case INSURANCES.FIANCE:
                icon = 'fa fa-industry fs-2';
                break;
            case INSURANCES.PROFESIONAL:
                icon = 'fa fa-exclamation-circle fs-2';
                break;
            case INSURANCES.TECHNICAL:
                icon = 'fa fa-cogs fs-2';
                break;
            case INSURANCES.CAUTIONS:
                icon = 'fa fa-handshake-o fs-2';
                break;
            case INSURANCES.TRUCK:
                icon = 'mdi mdi-truck';
                break;
            case INSURANCES.NAVY:
                icon = 'mdi mdi-ferry';
                break;
            case INSURANCES.AERO:
                icon = 'mdi mdi-airplane-landing';
                break;
            case INSURANCES.FARM:
                icon = 'fa fa-leaf fs-2';
                break;
            case INSURANCES.PICKUP:
                icon = 'mdi mdi-car-pickup';
                break;
            case INSURANCES.DENTAL:
                icon = 'mdi mdi-tooth';
                break;
            case INSURANCES.ILLNESS:
                icon = 'mdi mdi-pill';
                break;
            case INSURANCES.RETIRE:
                icon = 'mdi mdi-currency-usd';
                break;
            case INSURANCES.CARD:
                icon = 'mdi mdi-credit-card';
                break;
            case INSURANCES.COMERCIAL:
                icon = 'mdi mdi-store';
                break;
            case INSURANCES.LAND:
                icon = 'mdi mdi-terrain';
                break;
            case INSURANCES.DEVICE:
                icon = 'mdi mdi-cellphone';
                break;
            case INSURANCES.UNEMPLOYMENT:
                icon = 'mdi mdi-briefcase';
                break;
            case INSURANCES.CASH:
                icon = 'mdi mdi-cash-100';
                break;
            case INSURANCES.BUS:
                icon = 'mdi mdi-bus';
                break;
            case INSURANCES.DELIVERY:
                icon = 'mdi mdi-package-down';
                break;
            case INSURANCES.RADIOCTIVE:
                icon = 'mdi mdi-radioactive';
                break;
            case INSURANCES.CONTAINER:
                icon = 'mdi mdi-truck-delivery';
                break;
            case INSURANCES.TRAILER:
                icon = 'mdi mdi-truck-trailer';
                break;
            case INSURANCES.CONSTRUCTION:
                icon = 'fa fa-cubes fs-2';
                break;
            case INSURANCES.MACHIN:
                icon = 'fa fa-server fs-2';
                break;
            default:
                icon = '';
                break;
        }
        return icon;
    }
}
