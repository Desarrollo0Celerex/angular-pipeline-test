declare var SweetAlertPlugin: any;

import { Alert } from '@interfaces/alert.interface';

export class AlertsHelper {

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
