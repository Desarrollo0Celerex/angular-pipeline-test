import { Component } from '@angular/core';

@Component({
    selector: 'agt-changelog',
    templateUrl: './changelog.page.html',
    styles: [],
})
export class ChangelogPage {
    logs: any[] = [
        {
            version: '1.54.28',
            launchDate: '19/12/2024',
            changes: [
                {
                    title: 'Nofier',
                    items: [
                        'Se actualizo lógica para mostrar erro cuando una notificación no ha sido enviada con éxito.',
                        'Se actualizó número de soporte de Agenthos.',
                    ],
                },
            ],
        },
        {
            version: '1.54.27',
            launchDate: '13/12/2024',
            changes: [
                {
                    title: 'Workspace',
                    items: [
                        'Se actualizó la referencia de Atombits por Agenthos',
                        'Se actualizó el botón de navegación de las tarjetas de kpis, así como sus márgenes para reducir espacios en blanco.',
                        'Se actualizaron estilos en el header logo, side-bar logo y la tarjeta del perfil de contacto',
                    ],
                },
            ],
        },
        {
            version: '1.54.26',
            launchDate: '06/12/2024',
            changes: [
                {
                    title: 'Workspace',
                    items: [
                        'Se resolvio bug al ingresar a una url de agenthos directamente sin tener una sesión, para que al iniciar sesión redireccione al usuario a la url que intento ingresar.',
                        'Se resolvio bug al mostrar graficas que no tengan datos, para que la animación de "cargando..." desaparesca y se ponca una legenda de "Sin datos".',
                    ],
                },
            ],
        },
        {
            version: '1.54.25',
            launchDate: '02/12/2024',
            changes: [
                {
                    title: 'Contact',
                    items: [
                        'Se corrigió el margen de los días de expiración de un documento de contacto y se eliminaron espacios inecesarios en las fechas',
                    ],
                },
            ],
        },
        {
            version: '1.54.24',
            launchDate: '28/11/2024',
            changes: [
                {
                    title: '',
                    items: [
                        'Se agregó un nuevo campo para agregar la fecha de expiración en los documentos del expediente de un contacto.',
                    ],
                },
            ],
        },
        {
            version: '1.54.23',
            launchDate: '19/11/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se resolvio bug al actualizar el bien asegurado de una póliza de vida, gastos medicos, etc.',
                    ],
                },
            ],
        },
        {
            version: '1.54.22',
            launchDate: '15/11/2024',
            changes: [
                {
                    title: 'Task',
                    items: [
                        'Se agregaron reportes para tareas pendintes, en progreso y terminadas.',
                        'Se resolvio bug al listar las tareas por primera vez',
                    ],
                },
            ],
        },
        {
            version: '1.54.21',
            launchDate: '12/11/2024',
            changes: [
                {
                    title: 'Auth',
                    items: [
                        'Se resolvio bug al autenticar a un usuario proveniente del assitant.',
                    ],
                },
            ],
        },
        {
            version: '1.54.20',
            launchDate: '08/11/2024',
            changes: [
                {
                    title: 'Auth',
                    items: [
                        'Se agrego conexión con el servicio Assitant para la creación de los espacios de trabajo',
                    ],
                },
            ],
        },
        {
            version: '1.54.19',
            launchDate: '01/11/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego la descarga del reporte de pólizas emitidas',
                    ],
                },
            ],
        },
        {
            version: '1.54.18',
            launchDate: '30/10/2024',
            changes: [
                {
                    title: 'Workspace',
                    items: [
                        'Se actualizo página "Crear un espacio de trabajo" para que el espacio de trabajo se active también de forma automática después de ser creada asignandole una licencia LITE por default ',
                    ],
                },
            ],
        },
        {
            version: '1.54.17',
            launchDate: '29/10/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agregaron asegurados dependientes para las pólizas que se encuentren en el grupo personas.',
                        'Se agrego titulo "Smart Wallet" a todas las páginas de una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.54.3',
            launchDate: '02/07/2024',
            changes: [
                {
                    title: 'Task',
                    items: [
                        'Se agrego titulo de la tarea en la card de tarea.',
                    ],
                },
            ],
        },
        {
            version: '1.54.2',
            launchDate: '12/06/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se resolvio bug al mostrar modal cuando la sesión de un usuario ha expirado.',
                    ],
                },
            ],
        },
        {
            version: '1.54.1',
            launchDate: '07/06/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego funcionalidad para restaurar una póliza cancelada.',
                    ],
                },
            ],
        },
        {
            version: '1.54.0',
            launchDate: '31/05/2024',
            changes: [
                {
                    title: 'Workspace',
                    items: [
                        'Se agrego modal para permitir al usuario cambiar de espacio de trabajo.',
                    ],
                },
            ],
        },
        {
            version: '1.53.1',
            launchDate: '20/05/2024',
            changes: [
                {
                    title: 'Dashboard | Policy',
                    items: [
                        'Se atualizo rango de fechas en los KPIs del dashboard a 30 días antes hasta 40 días después.',
                        'Se agrego logica para calcular la edad del titular cada vez que se cambie la identificación del titular.',
                    ],
                },
            ],
        },
        {
            version: '1.53.0',
            launchDate: '17/05/2024',
            changes: [
                {
                    title: 'Payment',
                    items: ['Se agrego notificación "confirmación de pago".'],
                },
            ],
        },
        {
            version: '1.52.12',
            launchDate: '04/04/2024',
            changes: [
                {
                    title: 'Payment',
                    items: [
                        'Se agrego modal para mostrar acciones después de aplicar un pago.',
                    ],
                },
            ],
        },
        {
            version: '1.52.11',
            launchDate: '03/04/2024',
            changes: [
                {
                    title: 'Payment',
                    items: ['Se soluciono bug en modal para aplicar un pago.'],
                },
            ],
        },
        {
            version: '1.52.10',
            launchDate: '02/04/2024',
            changes: [
                {
                    title: 'Payment',
                    items: ['Se actualizo modal para aplicar un pago.'],
                },
            ],
        },
        {
            version: '1.52.9',
            launchDate: '26/03/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se resolvio bug al renovar una póliza y marcar por default estatus del pago automático.',
                    ],
                },
            ],
        },
        {
            version: '1.52.8',
            launchDate: '18/03/2024',
            changes: [
                {
                    title: 'Sidebar',
                    items: [
                        'Se nuevo sidebar que contempla accesos rapidos y gestion de los temas.',
                    ],
                },
            ],
        },
        {
            version: '1.52.6',
            launchDate: '07/03/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego lógica para extraer los datos del vendedor y pago automático de la póliza renovada, al cargar una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.52.4',
            launchDate: '27/02/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se soluciono bug al calcular la edad en base al RFC escaneado.',
                        'Se soluciono bug generar la fecha de nacimiento en base al RFC escaneado.',
                    ],
                },
            ],
        },
        {
            version: '1.52.3',
            launchDate: '26/02/2024',
            changes: [
                {
                    title: 'Payment',
                    items: ['Se agrego alerta de último recordatorio de pago.'],
                },
            ],
        },
        {
            version: '1.52.2',
            launchDate: '24/02/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego logica para sobreescribir fecha de nacimiento del contacto calculada en base RFC al cargar una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.52.1',
            launchDate: '20/02/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se actualizo monto base para calcular comisión de un sub agente al cargar una póliza (monto de póliza por prima neta).',
                    ],
                },
            ],
        },
        {
            version: '1.52.0',
            launchDate: '16/02/2024',
            changes: [
                {
                    title: 'Payment',
                    items: ['Se actualizo el envío de recordatorios de pago.'],
                },
            ],
        },
        {
            version: '1.51.3',
            launchDate: '07/02/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se resolvio bug al actualizar el PDF de una póliza.',
                        'Se resolvio bug al reexpedir una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.51.2',
            launchDate: '06/02/2024',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego flujo para reexpedir una póliza.',
                        'Se agrego flujo para renovar una póliza.',
                        'Se agrego el plan que tien un espacio de trabajo',
                    ],
                },
            ],
        },
        {
            version: '1.51.1',
            launchDate: '23/01/2024',
            changes: [
                {
                    title: 'Policies',
                    items: [
                        'Se actualizo menu "Cancelar" en las pólizas.',
                        'Se soluciono error en el comando de voz "Muéstrame recibos vencidos".',
                    ],
                },
            ],
        },
        {
            version: '1.50.0',
            launchDate: '18/01/2024',
            changes: [
                {
                    title: 'Policies',
                    items: [
                        'Se flujo para cargar una cotización de una póliza a un cliente nuevo o existente.',
                    ],
                },
            ],
        },
        {
            version: '1.49.10',
            launchDate: '15/12/2023',
            changes: [
                {
                    title: 'Policies',
                    items: [
                        'Se agrego modal para enviar por correo y whatsapp uns póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.49.9',
            launchDate: '07/12/2023',
            changes: [
                {
                    title: 'Payments',
                    items: [
                        'Se agrego logica para gestionar comentarios en un pago.',
                    ],
                },
            ],
        },
        {
            version: '1.49.8',
            launchDate: '05/12/2023',
            changes: [
                {
                    title: 'All Policies',
                    items: [
                        'Se corrigio bug en el filtro para listar las pólizas que inician vigencia los últimos 8 días.',
                    ],
                },
            ],
        },
        {
            version: '1.49.6',
            launchDate: '04/12/2023',
            changes: [
                {
                    title: 'All Policies',
                    items: [
                        'Se corrigio bug en el filtro para listar las pólizas que inician vigencia los últimos 8 días.',
                    ],
                },
            ],
        },
        {
            version: '1.49.5',
            launchDate: '29/11/2023',
            changes: [
                {
                    title: 'Policy Complement',
                    items: [
                        'Se agrego gestion para los complementos de la póliza (listado, carga, descarga y eliminación).',
                    ],
                },
            ],
        },
        {
            version: '1.49.4',
            launchDate: '24/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agregaron campos "Número de cuenta, Número de tarjeta y Nombre del banco" al completar la póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.49.3',
            launchDate: '23/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego funcionalidad para enviar correo automatico de poliza emitida si cumple la condición de los 8 días.',
                        'Se resolvio bug al actualizar p´lizas vencidas',
                    ],
                },
            ],
        },
        {
            version: '1.49.2',
            launchDate: '21/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: ['Solución de bug al filtrar todas las pólizas.'],
                },
            ],
        },
        {
            version: '1.49.1',
            launchDate: '21/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se solucionaron bugs en la carga de todas las pólizas.',
                    ],
                },
            ],
        },
        {
            version: '1.49.0',
            launchDate: '16/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego página para listar las pólizas cargadas en los últimos 8 días.',
                    ],
                },
            ],
        },
        {
            version: '1.48.6',
            launchDate: '14/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se actualizaron iconos en tipo de seguro y tipo de producto.',
                        'Se actualizaron a campos opcionales edad, genero y representante legal del contratante.',
                        'Se actualizo HTML del contenedor "Datos del Agente"',
                    ],
                },
            ],
        },
        {
            version: '1.48.5',
            launchDate: '13/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se actualizaron textos y campos opcionales al cargar una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.48.4',
            launchDate: '10/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agregaron campos a la póliza: porcentaje, monto y moneda para asesorías y costos administrativos.',
                    ],
                },
            ],
        },
        {
            version: '1.48.3',
            launchDate: '03/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego agregaron los calendars de Angular para seleccionar la fecha de emision, inicio y fin de vigencia al completar una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.48.2',
            launchDate: '02/11/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego nuevo diseño al panel izquierdo de la página para completar la póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.48.1',
            launchDate: '25/10/2023',
            changes: [
                {
                    title: 'Home',
                    items: [
                        'Se agrego botón "Asistente" para listar acciones rapidas en Agenthos.',
                    ],
                },
            ],
        },
        {
            version: '1.48.0',
            launchDate: '23/10/2023',
            changes: [
                {
                    title: 'Task',
                    items: [
                        'Se agrego servicio "policy tuneator" ara agregar un cover a las pólizas cargadas.',
                    ],
                },
            ],
        },
        {
            version: '1.47.21',
            launchDate: '09/09/2023',
            changes: [
                {
                    title: 'Task',
                    items: [
                        'Se agrego modal completo al crear una tarea desde Task Planner y Pay Tracker.',
                    ],
                },
            ],
        },
        {
            version: '1.47.20',
            launchDate: '28/08/2023',
            changes: [
                {
                    title: 'Poicy',
                    items: [
                        'Se agrego logíca para actualizar el correo y el teléfono de la póliza después de enviarla.',
                    ],
                },
            ],
        },
        {
            version: '1.47.19',
            launchDate: '26/08/2023',
            changes: [
                {
                    title: 'Poicy',
                    items: [
                        'Se agrego gestion de comisiones para el agente y el vendedor.',
                        'Se agregaron los campos "producto" y "periodo de gracia" a la póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.47.18',
            launchDate: '23/08/2023',
            changes: [
                {
                    title: 'Poicy',
                    items: [
                        'Se resolvio bug al dar click a salir en el modal de acciones de una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.47.17',
            launchDate: '22/08/2023',
            changes: [
                {
                    title: 'Task',
                    items: [
                        'Se actualizo el flujo de crear una tarea para agregar un callback.',
                    ],
                },
            ],
        },
        {
            version: '1.47.16',
            launchDate: '21/08/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se actualizo el componente "seleccionar las acciones de una póliza" para agregar la acción "Crear tarea".',
                    ],
                },
            ],
        },
        {
            version: '1.47.15',
            launchDate: '18/08/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se creo un componente para enviar una póliza.',
                        'Se agrego una página para cerrar la sesión antes de aceptar una invitación.',
                        'Se actualizo el estatus de los campos a reescribir en el perfil de un cliente a activo.',
                        'Se elimino la validación personalizada de cada red social y se agrego la validación como un link generico.',
                    ],
                },
            ],
        },
        {
            version: '1.47.13',
            launchDate: '09/08/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se resolvio bug al completar una póliza, ya que al cargar una póliza para un cliente de tipo empresa, se validaba el campo del gener para ser reescrito en el perfil del cliente, cuando en estos tipos de cliente ese campo no existe.',
                    ],
                },
            ],
        },
        {
            version: '1.47.12',
            launchDate: '08/08/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se resolvio bug al mostrar el modal de acciones y seleccionar "APLICAR PAGOS".',
                        'Se actualizo modal de acciones para quitar la "x" (Cerrar modal) y cambiar etiqueta "CANCELAR" por "SALIR".',
                    ],
                },
            ],
        },
        {
            version: '1.47.11',
            launchDate: '07/08/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se resolvio bug al mostrar el código teléfonico cuando no hay número de teléfono al reescribir los datos del contacto al completar una póliza.',
                        'Se agrego la etiqueta "Sin Datos" cuando un campo esta vacío al mostrar la lista de campos a reescribir en el perfil del contacto.',
                    ],
                },
            ],
        },
        {
            version: '1.47.10',
            launchDate: '05/08/2023',
            changes: [
                {
                    title: 'Policy',
                    items: [
                        'Se agrego lógica para reescribir campos del perfil del contacto al completar una póliza.',
                        'Se agrego modal para selecionar alguna acción después de que una póliza fue guardada con éxito.',
                    ],
                },
            ],
        },
        {
            version: '1.47.9',
            launchDate: '02/08/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego botón SALIR en la página de Bienvenida al iniciar sesión.',
                        'Se agrego calculo automático de los gastos de expedición de la póliza al cargarla.',
                        'Se agrego calculo automático del iva de la póliza al cargarla.',
                        'Se agrego calculo automático del monto total de la póliza al cargarla.',
                        'Se actualizo calculo automático de la comisión de la póliza al cargarla para no usar el monto total y usar el monto neto.',
                    ],
                },
            ],
        },
        {
            version: '1.47.8',
            launchDate: '18/07/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se soluciono bug al mostrar el número de recibos al actualizar una póliza.',
                        'Se agrego busqueda de póliza por número de serie del vehículo al reportar un siniestro.',
                    ],
                },
            ],
        },
        {
            version: '1.47.7',
            launchDate: '29/06/2023',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se agrego busqueda de siniestros por número de serie.',
                        'Se agrego carga de video en las evidencias del siniestro.',
                        'Se agrego inhabilitación de elementos en base a su rol.',
                        'Se agrego la gestion de ejecutivos de un siniestro.',
                        'Se agrego vista previa de imagenes al ver las evidencias de un siniestro.',
                    ],
                },
            ],
        },
        {
            version: '1.47.6',
            launchDate: '13/06/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrago proceso para activar un espacio de trabajo de forma automatica.',
                        'Se resolvio bug en endosos para mostrar el plan de pago exacto.',
                        'Se resolvio bug en data suite - clientes.',
                        'Se resolvio bug al descargar póliza desde un pago de un mismo cliente.',
                        'Se agrego nuevo title al modulo de Pay Tracker y Task Planner.',
                    ],
                },
            ],
        },
        {
            version: '1.47.5',
            launchDate: '10/06/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo aplicación de endosos con decremento de prima, para permitir aplicar recibo fraccionado.',
                    ],
                },
            ],
        },
        {
            version: '1.47.4',
            launchDate: '09/06/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: ['Se actualizo interfaz para aplicar endosos'],
                },
            ],
        },
        {
            version: '1.47.3',
            launchDate: '08/06/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo aplicación de endosos con incremento y decremento de prima, para permitir cambiar el plan de pago',
                    ],
                },
            ],
        },
        {
            version: '1.47.2',
            launchDate: '05/06/2023',
            changes: [
                {
                    title: 'Task Planner',
                    items: [
                        'Se agrego página de calendario de tareas',
                        'Se agrego página para mostrar los resultados de busqueda de las tareas',
                    ],
                },
            ],
        },
        {
            version: '1.47.1',
            launchDate: '30/05/2023',
            changes: [
                {
                    title: 'Task Planner',
                    items: [
                        'Se actualizo página para listar tareas para agregar las acciones de la tarea',
                        'Se removieron páginas de listado de pagos y calendario antiguas',
                    ],
                },
            ],
        },
        {
            version: '1.47.0',
            launchDate: '25/05/2023',
            changes: [
                {
                    title: 'Task Planner',
                    items: ['Se agrego página para listar tareas'],
                },
            ],
        },
        {
            version: '1.46.2',
            launchDate: '24/05/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego página para listar los pagos pendientes de un socio',
                        'Se agrego página para listar los pagos applicados de un socio',
                    ],
                },
            ],
        },
        {
            version: '1.46.1',
            launchDate: '19/05/2023',
            changes: [
                {
                    title: 'Authentication',
                    items: ['Se resolvio bug en la autenticación'],
                },
            ],
        },
        {
            version: '1.46.0',
            launchDate: '19/05/2023',
            changes: [
                {
                    title: 'Pay Tracker',
                    items: [
                        'Se creo un nuevo modulo para pay tracker, integrando pagos, buscador de pagos y calendario de pagos.',
                    ],
                },
            ],
        },
        {
            version: '1.45.2',
            launchDate: '18/04/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo página para completar póliza para que cuando el scanner falle y no se pueda extraer info de una póliza anterior (en caso de renovación) se extraiga los datos cargados en el perfil del contacto.',
                    ],
                },
            ],
        },
        {
            version: '1.45.1',
            launchDate: '17/04/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego modal para actualizar la licencia de Agenthos para poder activar más productos en el Lead manager.',
                        'Se actualizo página para completar póliza para que cuando el scanner falle y no se pueda extraer info de una póliza anterior se extraiga los datos cargados en el perfil del contacto.',
                    ],
                },
            ],
        },
        {
            version: '1.45.0',
            launchDate: '13/04/2023',
            changes: [
                {
                    title: 'Workspace',
                    items: [
                        'Se agrego funcionalidad para activar un espacio de trabajo con un código de activación.',
                        'Se agregaron modals y alerts al activar o desactivar un producto en el lead generator.',
                        'Se actualizo modal que se muestra al fallar el escaneo al cargar una póliza, pero por ser una renovación se extrae data de la póliza anterior.',
                    ],
                },
            ],
        },
        {
            version: '1.44.2',
            launchDate: '12/04/2023',
            changes: [
                {
                    title: 'Lead Manager',
                    items: [
                        'Se resolvieron bugs en motor de coincidencias al crear un contacto.',
                        'Se agrego logica para buscar coincidencias en la razón social y en el nombre comercial al crear un contacto tipo empresa.',
                    ],
                },
            ],
        },
        {
            version: '1.44.1',
            launchDate: '10/04/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se resolvio bug al aplicar endosos de actualización de datos o cancelación',
                    ],
                },
            ],
        },
        {
            version: '1.44.0',
            launchDate: '06/04/2023',
            changes: [
                {
                    title: 'Lead Generator',
                    items: [
                        'Se agrego página para gestionar la activación y desactivación del productos en el Lead Generator.',
                    ],
                },
            ],
        },
        {
            version: '1.43.2',
            launchDate: '04/04/2023',
            changes: [
                {
                    title: 'Welcome',
                    items: [
                        'Se actualizo modulo Welcome para arreglar unos detalles pendientes.',
                        'Se integro conexión a nueva API que gestionara el analisis, importación y exportación de asegurados de una póliza',
                    ],
                },
            ],
        },
        {
            version: '1.43.1',
            launchDate: '31/03/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo interfaz de aplicación de endosos para integrar nueva UI, nuevos campos de vigencia y montos del endoso, así como también el calculo automático del recibo fraccionado en los montos de incremento de prima.',
                        'Se resolvio bug al capturar cantidades grandes con el simbolo "," (coma)',
                    ],
                },
            ],
        },
        {
            version: '1.43.0',
            launchDate: '24/03/2023',
            changes: [
                {
                    title: 'Welcome',
                    items: [
                        'Se agregaron módulos contact center, social conect, site creator y app creator.',
                    ],
                },
            ],
        },
        {
            version: '1.42.1',
            launchDate: '01/03/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego carga de archivos pesados al actualizar un archivo en el espediente del cliente, hasta 10 MB.',
                        'Se soluciono bug al renovar una póliza, la aseguradora de la póliza anterior no aparecia seleccionada por default.',
                    ],
                },
            ],
        },
        {
            version: '1.42.0',
            launchDate: '01/03/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se soluciono bug al eliminar una documento en el espediente de un contacto.',
                        'Se agrego carga de archivos pesados en el espediente del archivo, hasta 10 MB.',
                    ],
                },
            ],
        },
        {
            version: '1.41.1',
            launchDate: '23/02/2023',
            changes: [
                {
                    title: 'Dashboard',
                    items: [
                        'Se agrego opción para que se puedan arrastrar también archivos en la carga de archivos.',
                        'Se actualizo perfil del contacto para agregar el campo apellido materno como opcional.',
                        'Se resolvio bug al mostrar las coincidencias de contactos encontradas por email y/o teléfono.',
                        'Se corrigio código para mostrar correctamente el nombre de un contacto aun cuando solo sea nombre y apellido paterno.',
                        'Se agrego KPI e interfaz para mostrar las pólizas renovadas.',
                    ],
                },
            ],
        },
        {
            version: '1.41.0',
            launchDate: '13/02/2023',
            changes: [
                {
                    title: 'Dashboard',
                    items: [
                        'Se actualizo dashboard para reorganizar los Kpis del espacio de trabajo.',
                    ],
                },
            ],
        },
        {
            version: '1.40.0',
            launchDate: '03/02/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego contenedor al dashboard para mostrar las primeras 4 pólizas pendientes del espacio de trabajo.',
                        'Se agrego página para listar todas las pólizas pendientes del espacio de trabajo.',
                    ],
                },
            ],
        },
        {
            version: '1.39.0',
            launchDate: '02/02/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo el listado de seguros para filtrarlos por grupos y se agrego búsqueda.',
                        'Se actualizaron historiales de siniestros, endosos y pagos de una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.38.0',
            launchDate: '28/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo página de la información de contacto del contacto para agregar nueva gestión de la información de contacto.',
                    ],
                },
            ],
        },
        {
            version: '1.37.2',
            launchDate: '19/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo etiqueta "Pagos Totales" por "Pagos Aplicados" en el modal del detalle de una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.37.1',
            launchDate: '14/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego carga manual para seguros grupales y collectivos de personas, propiedades, objetos y por default.',
                    ],
                },
            ],
        },
        {
            version: '1.37.0',
            launchDate: '13/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego descarga de reporte ejecutivo para flotillas.',
                        'Se agrego descarga de reporte editable para flotillas.',
                        'Se agregaron páginas para mostrar las renovaciones aplicadas y pedientes de un contacto.',
                        'Se agregaron páginas para mostrar los pagos aplicados y pedientes de un contacto.',
                    ],
                },
            ],
        },
        {
            version: '1.36.2',
            launchDate: '07/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego logica para descargar una copia del documento usado para importar certificados cuando éste contenga errores.',
                    ],
                },
            ],
        },
        {
            version: '1.36.1',
            launchDate: '04/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego página para gestionar certificados de una póliza (cancelar, eliminar, buscar, exportar, importar, etc).',
                    ],
                },
            ],
        },
        {
            version: '1.36.0',
            launchDate: '30/12/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizaron la páginas para completar y actualizar pólizas para remover la carga de unidades de una flotilla.',
                        'Se agrego página para exportar e importar unidades a una flotilla',
                    ],
                },
            ],
        },
        {
            version: '1.35.3',
            launchDate: '22/12/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo página para actualizar una póliza para agregar nuevos campos sobre las comisiones.',
                    ],
                },
            ],
        },
        {
            version: '1.35.2',
            launchDate: '20/12/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo página para completar una póliza para agregar nuevos campos sobre las comisiones.',
                    ],
                },
            ],
        },
        {
            version: '1.35.1',
            launchDate: '14/12/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se resolvio bug al intentar ver la información de un contacto desde su código QR.',
                    ],
                },
            ],
        },
        {
            version: '1.35.0',
            launchDate: '14/12/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se agrego botón para descargar reporte de siniestros abiertos.',
                    ],
                },
            ],
        },
        {
            version: '1.34.1',
            launchDate: '29/11/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego vista previa al seleccionar un archivo al cargar una póliza.',
                        'Se agrego aceptación de "/" al capturar y/o actualizar el nombre de un contacto',
                    ],
                },
            ],
        },
        {
            version: '1.34.0',
            launchDate: '29/11/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se integro carga de archivos pesados hasta 10MB al cargar una póliza.',
                    ],
                },
            ],
        },
        {
            version: '1.33.8',
            launchDate: '24/11/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se habilito carga de varias evidencias al reportar un siniestro.',
                    ],
                },
            ],
        },
        {
            version: '1.33.7',
            launchDate: '23/11/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se agrego nuevo evento "Indemnización" al reportar un siniestro.',
                        'Se agrego nuevo flujo para capturar el número de certificado',
                    ],
                },
            ],
        },
        {
            version: '1.33.6',
            launchDate: '18/11/2022',
            changes: [
                {
                    title: 'Bugs',
                    items: [
                        'Se actualizo aplicación de endosos con incremento y decremento para guardar el monto del endoso.',
                        'Se actualizo aplicación de endosos con incremento para guardar el metodo de pago.',
                        'Se habilito menú para actualizar una póliza pendiente.',
                        'Se agrego conexión con Stripe para capturar los datos de tarjeta y activar un espacio de trabajo.',
                    ],
                },
            ],
        },
        {
            version: '1.33.5',
            launchDate: '10/11/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se habilito actualización del plan de pago si y solo si la póliza solo es de un pago (pago único o pago anual) y la vigencia de la póliza es de un año o menor.',
                        'Se agrego validación al aplicar un endoso de incremento o decremento de prima para que el monto del endoso sea diferente a cero.',
                    ],
                },
            ],
        },
        {
            version: '1.33.4',
            launchDate: '08/11/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se soluciono bug al aplicar un endoso de incremento de prima y en ese proceso intentar carmbiar el plan de pago; los recibos no se calculaban bien.',
                        'Se soluciono bug al actualizar una póliza de autos individual a autos flotilla',
                    ],
                },
            ],
        },
        {
            version: '1.33.3',
            launchDate: '19/10/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se soluciono bug al cargar y actualizar pólizas de la categoría "Hogar & Propiedades Inmobiliarias".',
                    ],
                },
            ],
        },
        {
            version: '1.33.2',
            launchDate: '18/10/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego ordenamiento en listado de seguros.',
                        'Se actualizo cabecera del cliente.',
                    ],
                },
            ],
        },
        {
            version: '1.33.1',
            launchDate: '17/10/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo listado de seguros.',
                        'Se agrego sección de seguros recomendados.',
                    ],
                },
            ],
        },
        {
            version: '1.33.0',
            launchDate: '13/10/2022',
            changes: [
                {
                    title: 'Policy Search Engine',
                    items: [
                        'Se página para buscar pólizas de un espacio de trabajo.',
                    ],
                },
            ],
        },
        {
            version: '1.32.4',
            launchDate: '13/10/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se solucionaron bugs al cargar endosos de incremento a las pólizas.',
                        'Se agrego item en el historial de una póliza para saber el origen de una póliza que fue reexpedida.',
                        'Se habilitaron todos los planes de pago al aplicar un endoso.',
                    ],
                },
            ],
        },
        {
            version: '1.32.3',
            launchDate: '20/09/2022',
            changes: [
                {
                    title: 'Data Suite',
                    items: [
                        'Se agrego grafica para visualizar los siniestros de autos reportados dentro de un periodo.',
                        'Se agrego página para listar los siniestros de autos reportados dentro de un periodo.',
                        'Se agrego reporte para descargar información sobre los siniestros de autos.',
                    ],
                },
            ],
        },
        {
            version: '1.32.2',
            launchDate: '15/09/2022',
            changes: [
                {
                    title: 'Changelog',
                    items: ['Se actualizo changelog.'],
                },
            ],
        },
        {
            version: '1.32.1',
            launchDate: '14/09/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se agrego No. de Siniestro en la tarjeta del siniestro.',
                        'Se actualizo modal de los detalles del siniestro.',
                        'Se actualizo buscador de siniestros para buscar por Nombre del cliente, Nombre del titular, Bien Asegurado, No. de póliza, No. de siniestro y No. de folio.',
                        'Se permitio capturar No. de certificado, incluso si el certificado no existe.',
                        'Se agrego select para poder escoger si se desea mostrar el evento al asegurado o si es un seguimiento interno.',
                        'Se abrio campo “Capturar evidencia del endoso” para poder seleccionar cualquier tipo de archivo.',
                    ],
                },
            ],
        },
        {
            version: '1.32.0',
            launchDate: '27/08/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se agrego actualización al reportar un sinisetro.',
                        'Se agrego actualización al ver el historial de un siniestro.',
                    ],
                },
            ],
        },
        {
            version: '1.31.0',
            launchDate: '27/08/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se Se agrego descarga de reporte para las pólizas tipo flotilla.',
                    ],
                },
            ],
        },
        {
            version: '1.30.2',
            launchDate: '24/08/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo la actualización de pólizas para actualizar, eliminar y agregar unidades a una flotilla',
                    ],
                },
            ],
        },
        {
            version: '1.30.1',
            launchDate: '22/08/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo la carga de pólizas para integrar la captura de flotillas',
                    ],
                },
            ],
        },
        {
            version: '1.30.0',
            launchDate: '28/07/2022',
            changes: [
                {
                    title: 'App Creator',
                    items: ['Se agrego nuevo tema "Dark Blue"'],
                },
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego nueva forma de pago "Estado de cuenta"',
                        'Se agregi nuevo plan de pago "Cuatrimestral"',
                        'Se ocultaron los componentes de control por voz al iniciar la app',
                    ],
                },
                {
                    title: 'Angular',
                    items: [
                        'Se actualizo la aplicación de Angular v12 a Angular v14',
                    ],
                },
            ],
        },
    ];
}
