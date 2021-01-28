declare var SweetAlertPlugin: any;

import { Alert } from '@interfaces/alert.interface';

export class AlertHelper {

    static trialStarted(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Acceso Permitido',
            text: 'El periodo de prueba de 30 días ha sido activado.',
            type: 'success',
            confirmButtonText: 'ACEPTAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static workspaceAvatarUploaded(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Imagen cargada',
            text: 'La imagen del agente ha sido cargada con éxtio.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static workspaceCreated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Agente registrado',
            text: 'Tu espacio de trabajo se ha creado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

}
