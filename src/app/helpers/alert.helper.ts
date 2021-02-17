declare var SweetAlertPlugin: any;

import { Alert } from '@interfaces/alert.interface';

export class AlertHelper {

    static globalError(): void {
        const alertData: Alert = {
            title: 'Error',
            text: 'No fue posible realizar la solicitud.',
            type: 'error',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static invalidAuthToken(): void {
        const alertData: Alert = {
            title: 'Error',
            text: 'No fue posible autenticar al usuario.',
            type: 'error',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static invalidFields(): void {
        const alertData: Alert = {
            title: 'Error',
            text: 'Los datos enviados son invalidos.',
            type: 'error',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static invalidUserToken(): void {
        const alertData: Alert = {
            title: 'Lo sentimos',
            text: 'Tu sesión ha expirado.',
            type: 'error',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static invitationDeleted(): void {
        const alertData: Alert = {
            title: 'Invitación Eliminada',
            text: 'Tu invitación ha sido eliminada con éxito.',
            type: 'success',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static invitationRejected(): void {
        const alertData: Alert = {
            title: 'Invitación Rechazada',
            text: 'Si has rechazado esta invitación por error, por favor solicita una nueva invitación.',
            type: 'success',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static invitationSent(): void {
        const alertData: Alert = {
            title: 'Invitación Enviada',
            text: 'Tu invitación ha sido enviada con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static invitationSendAttemptsExceeded(): void {
        const alertData: Alert = {
            title: 'Límite Alcanzado',
            text: 'Ya no puedes reenviar esta invitación.',
            type: 'error',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static quotationAccepted(callBack: any, context: any, data: any): void {
        const alertData: Alert = {
            title: 'Cotización aceptada',
            text: 'La cotización ha sido aceptada con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context,
            data: data
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static quotationCreated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Cotización creada',
            text: 'La cotización ha sido creada con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static quotationRejected(callBack: any, context: any, data: any): void {
        const alertData: Alert = {
            title: 'Cotización rechazada',
            text: 'La cotización ha sido rechazada con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context,
            data: data
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static requestDeleteInvitation(callBack: any, context: any, data: any): void {
        const alertData: Alert = {
            title: 'Eliminar Invitación',
            text: 'Esta invitación será eliminada de tu espacio de trabajo.',
            type: 'warning',
            confirmButtonText: 'CONFIRMAR',
            showCancelButton: true,
            cancelButtonText: 'CANCELAR',
            callBack: callBack,
            context: context,
            data: data
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sendInvitationFailed(): void {
        const alertData: Alert = {
            title: 'Error',
            text: 'No fue posible enviar tu invitación. Intentalo nuevamente.',
            type: 'error',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

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
