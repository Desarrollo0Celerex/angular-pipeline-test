declare var SweetAlertPlugin: any;

import { Alert } from '@interfaces/alert.interface';

export class AlertHelper {

    static contactUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Contacto Actualizado',
            text: 'Los datos han sido actualizados con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static fileUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Archivo Actualizado',
            text: 'El archivo se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static fileDeleted(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Archivo Eliminado',
            text: 'El archivo se eliminó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static forbiddenAccess(): void {
        const alertData: Alert = {
            title: 'Error',
            text: 'Acceso denegado.',
            type: 'error',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

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

    static policyCancelled(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Póliza Cancelada',
            text: 'La póliza ha sido cancelada con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyDeleted(): void {
        const alertData: Alert = {
            title: 'Póliza Eliminada',
            text: 'La póliza se ha eliminado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyCompleted(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Datos Actualizados',
            text: 'Los datos de la póliza se han guardado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyEndorsed(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Endoso Aplicado',
            text: 'El endoso ha sido aplicado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyUploaded(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Póliza Cargada',
            text: 'La póliza se ha actualizado en la cartera del contacto.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Póliza Actualizada',
            text: 'La póliza se ha actualizado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
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

    static receiptPaid(callBack: any, context: any, data: any): void {
        const alertData: Alert = {
            title: 'Pago aplicado',
            text: 'El recibo ha sido pagado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context,
            data: data
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static receiptPaidDeleted(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Pago Eliminado',
            text: 'El pago ha sido eliminado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
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

    static sinisterCreated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Siniestro Registrado',
            text: 'El siniestro se ha registrado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterEventDeleted(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Evento Eliminado',
            text: 'El evento se eliminó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterEventReported(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Evento Reportado',
            text: 'El evento se registró con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterEventUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Evento Actualizado',
            text: 'El evento se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterFinished(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Siniestro Finalizado',
            text: 'El siniestro se cerró con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterReactivated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Siniestro Reactivado',
            text: 'El siniestro se reactivó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Siniestro Actualizado',
            text: 'El siniestro se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
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
