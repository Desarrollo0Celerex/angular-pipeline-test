declare var SweetAlertPlugin: any;

import { Alert } from '@interfaces/alert.interface';

export class AlertHelper {

    static contactDeleted(): void {
        const alertData: Alert = {
            title: 'Contacto Eliminado',
            text: 'El contacto se eliminó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static contactUpdated(): void {
        const alertData: Alert = {
            title: 'Contacto Actualizado',
            text: 'Los datos han sido actualizados con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static contactSourceUpdated(): void {
        const alertData: Alert = {
            title: 'Canal Actualizado',
            text: 'El canal ha sido actualizado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
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

    static fileUploadFailed(): void {
        const alertData: Alert = {
            title: 'Error',
            text: 'Error al cargar archivo.',
            type: 'error',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static forbiddenAccess(): void {
        const alertData: Alert = {
            title: 'Error',
            text: 'Acceso Denegado.',
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

    static groupCreated(): void {
        const alertData: Alert = {
            title: 'Grupo Creado',
            text: 'El grupo ha sido creado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static groupDeleted(): void {
        const alertData: Alert = {
            title: 'Grupo Eliminado',
            text: 'El grupo ha sido eliminado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static groupMemberAdded(): void {
        const alertData: Alert = {
            title: 'Cliente Agregado',
            text: 'El cliente se agregó al grupo con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static groupMemberDeleted(): void {
        const alertData: Alert = {
            title: 'Cliente Eliminado',
            text: 'El cliente se eliminó del grupo con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static importedInsureds(): void {
        const alertData: Alert = {
            title: 'Certificados Importadas',
            text: 'Los certificados han sido importados con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static importInsuredsFailed(): void {
        const alertData: Alert = {
            title: 'Datos invalidos',
            text: 'El archivo contiene algunos campos invalidos.',
            type: 'warning',
            confirmButtonText: 'ENTENDIDO'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static groupUpdated(): void {
        const alertData: Alert = {
            title: 'Grupo Actualizado',
            text: 'El grupo ha sido actualizado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
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

    static invalidForm(): void {
        const alertData: Alert = {
            title: 'Campos incompletos',
            text: 'Falta completar algunos campos obligatorios.',
            type: 'warning',
            confirmButtonText: 'ENTENDIDO'
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

    static partnerCreated(): void {
        const alertData: Alert = {
            title: 'Socio Creado',
            text: 'El socio ha sido creado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static partnerDeleted(): void {
        const alertData: Alert = {
            title: 'Socio Eliminado',
            text: 'El socio ha sido eliminado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static partnerUpdated(): void {
        const alertData: Alert = {
            title: 'Socio Actualizado',
            text: 'El socio ha sido actualizado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static paymentsActivated(): void {
        const alertData: Alert = {
            title: 'Cobranza Activada',
            text: 'La cobranza se ha reactivado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static paymentDateUpdated(): void {
        const alertData: Alert = {
            title: 'Recibo Actualizado',
            text: 'El recibo se ha actualizado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static paymentPreauthorized(): void {
        const alertData: Alert = {
            title: 'Pago Preautorizado',
            text: 'El pago está en espera de consolidación.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static paymentsSuspended(): void {
        const alertData: Alert = {
            title: 'Cobranza Suspendida',
            text: 'La cobranza se ha suspendido con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyAlreadyExists(): void {
        const alertData: Alert = {
            title: 'Error al guardar póliza',
            text: 'La póliza ya existe',
            type: 'error',
            confirmButtonText: 'OK'
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

    static policyDeletedByCaptureError(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Póliza Eliminada',
            text: 'La póliza se ha eliminado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
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

    static policyEndorsed(): void {
        const alertData: Alert = {
            title: 'Endoso Aplicado',
            text: 'El endoso ha sido aplicado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyInsuredCancelled(): void {
        const alertData: Alert = {
            title: 'Certificado Cancelado',
            text: 'El certificado se cancelo con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyInsuredCreated(): void {
        const alertData: Alert = {
            title: 'Certificado Creado',
            text: 'El certificado fue creado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyInsuredDeleted(): void {
        const alertData: Alert = {
            title: 'Certificado Eliminado',
            text: 'El certificado ha sido eliminado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static policyInsuredUpdated(): void {
        const alertData: Alert = {
            title: 'Certificado Actualizado',
            text: 'El certificado ha sido actualizado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
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
            title: 'Cotización Creada',
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
            title: 'Cotización Rechazada',
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

    static receiptPaid(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Pago Aplicado',
            text: 'El recibo ha sido pagado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static receiptPaidDeleted(callBack: any, context: any, data: any): void {
        const alertData: Alert = {
            title: 'Pago Eliminado',
            text: 'El pago ha sido eliminado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context,
            data: data
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static receiptPaidUpdated(): void {
        const alertData: Alert = {
            title: 'Pago Actualizado',
            text: 'El pago ha sido actualizado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
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

    static sinisterEventFinalized(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Evento Finalizado',
            text: 'El evento se finalizo con éxito.',
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

    static sinisterCertificateUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Certificado Actualizado',
            text: 'El certificado del siniestro se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterEvidenceUploaded(): void {
        const alertData: Alert = {
            title: 'Evidencia Cargada',
            text: 'La evidencia del siniestro se cargo con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterEvidenceUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Evidencia Actualizada',
            text: 'La evidencia del siniestro se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterReportUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Reporte Actualizado',
            text: 'El reporte del siniestro se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static sinisterTrackingUpdated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Tracking Actualizado',
            text: 'El tracking del siniestro se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static siteUpdated(): void {
        const alertData: Alert = {
            title: 'Sitio Actualizado',
            text: 'El sitio se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static socialConnectUpdated(): void {
        const alertData: Alert = {
            title: 'Red Actualizada',
            text: 'La red social se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static trialStarted(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Acceso Permitido',
            text: 'Tu periodo de prueba de 30 días ha sido activado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static userRoleUpdated(): void {
        const alertData: Alert = {
            title: 'Rol Actualizado',
            text: 'El rol del usuario se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static walletCreated(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Wallet Creado',
            text: 'La aplicación móvil se ha creado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static walletUpdated(): void {
        const alertData: Alert = {
            title: 'App Actualizada',
            text: 'La App se actualizó con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static walletContactUpdated(): void {
        const alertData: Alert = {
            title: 'Datos Actualizados',
            text: 'Los datos de contacto han sido actualizados con éxito.',
            type: 'success',
            confirmButtonText: 'OK'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static workspaceAvatarUploaded(callBack: any, context: any): void {
        const alertData: Alert = {
            title: 'Imagen Cargada',
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
            title: 'Agente Registrado',
            text: 'Tu espacio de trabajo se ha creado con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR',
            callBack: callBack,
            context: context
        }
        SweetAlertPlugin.showAlert(alertData);
    }

    static workspaceDirectoriesSaved(): void {
        const alertData: Alert = {
            title: 'Datos Actualizados',
            text: 'Los datos de contacto se actualizaron con éxito.',
            type: 'success',
            confirmButtonText: 'CONTINUAR'
        }
        SweetAlertPlugin.showAlert(alertData);
    }

}
