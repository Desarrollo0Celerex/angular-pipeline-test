import { Pipe, PipeTransform } from '@angular/core';
import { INSURANCES } from '@configs/constants.config';

@Pipe({
    name: 'insuranceBackground',
})
export class InsuranceBackgroundPipe implements PipeTransform {
    transform(insuranceId: number): string {
        let icon: string;
        switch (insuranceId) {
            case INSURANCES.LIFE:
                icon = 'lifeInsurance';
                break;
            case INSURANCES.RETIRE:
                icon = 'retireInsurance';
                break;
            case INSURANCES.HEALTH:
                icon = 'healthInsurance';
                break;
            case INSURANCES.ACCIDENT:
                icon = 'accidentInsurance';
                break;
            case INSURANCES.CAR:
                icon = 'carInsurance';
                break;
            case INSURANCES.MOTORBIKE:
                icon = 'scooterInsurance';
                break;
            case INSURANCES.BIKE:
                icon = 'bikeInsurance';
                break;
            case INSURANCES.HOME:
                icon = 'homeInsurance';
                break;
            case INSURANCES.BUILDING:
                icon = 'buildingInsurance';
                break;
            case INSURANCES.PET:
                icon = 'petInsurance';
                break;
            case INSURANCES.CRISIS:
                icon = 'crisisInsurance';
                break;
            case INSURANCES.OBJECTS:
                icon = 'objectsInsurance';
                break;
            case INSURANCES.TRAVEL:
                icon = 'travelInsurance';
                break;
            case INSURANCES.DEAD:
                icon = 'deadInsurance';
                break;
            case INSURANCES.LEGAL:
                icon = 'legalInsurance';
                break;
            case INSURANCES.CREDIT:
                icon = 'creditInsurance';
                break;
            case INSURANCES.WARRANTY:
                icon = 'warrantyInsurance';
                break;
            case INSURANCES.EDUCATION:
                icon = 'educationInsurance';
                break;
            case INSURANCES.FIANCE:
                icon = 'fianceInsurance';
                break;
            case INSURANCES.PROFESIONAL:
                icon = 'profesionalInsurance';
                break;
            case INSURANCES.TECHNICAL:
                icon = 'technicalInsurance';
                break;
            case INSURANCES.CAUTIONS:
                icon = 'cautionInsurance';
                break;
            case INSURANCES.TRUCK:
                icon = 'truckInsurance';
                break;
            case INSURANCES.NAVY:
                icon = 'navyInsurance';
                break;
            case INSURANCES.AERO:
                icon = 'aeroInsurance';
                break;
            case INSURANCES.FARM:
                icon = 'farmInsurance';
                break;
            case INSURANCES.PICKUP:
                icon = 'pickupInsurance';
                break;
            case INSURANCES.DENTAL:
                icon = 'dentalInsurance';
                break;
            case INSURANCES.ILLNESS:
                icon = 'illnessInsurance';
                break;
            case INSURANCES.RETIRE:
                icon = 'retireInsurance';
                break;
            case INSURANCES.CARD:
                icon = 'cardInsurance';
                break;
            case INSURANCES.COMERCIAL:
                icon = 'comercialInsurance';
                break;
            case INSURANCES.LAND:
                icon = 'landInsurance';
                break;
            case INSURANCES.DEVICE:
                icon = 'deviceInsurance';
                break;
            case INSURANCES.UNEMPLOYMENT:
                icon = 'unemploymentInsurance';
                break;
            case INSURANCES.CASH:
                icon = 'cashInsurance';
                break;
            case INSURANCES.BUS:
                icon = 'busInsurance';
                break;
            case INSURANCES.DELIVERY:
                icon = 'deliveryInsurance';
                break;
            case INSURANCES.RADIOCTIVE:
                icon = 'radioactiveInsurance';
                break;
            case INSURANCES.CONTAINER:
                icon = 'containerInsurance';
                break;
            case INSURANCES.TRAILER:
                icon = 'trailerInsurance';
                break;
            case INSURANCES.CONSTRUCTION:
                icon = 'constructionInsurance';
                break;
            case INSURANCES.MACHIN:
                icon = 'machineInsurance';
                break;
            default:
                icon = '';
                break;
        }
        return icon;
    }
}
