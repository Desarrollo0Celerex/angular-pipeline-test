import { Component } from '@angular/core';

@Component({
  selector: 'agt-changelog',
  templateUrl: './changelog.page.html',
  styles: [
  ]
})
export class ChangelogPage {
    logs: any[] = [
        {
            version: '1.38.0',
            launchDate: '28/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo página de la información de contacto del contacto para agregar nueva gestión de la información de contacto.',
                    ]
                }
            ]
        },
        {
            version: '1.37.2',
            launchDate: '19/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo etiqueta "Pagos Totales" por "Pagos Aplicados" en el modal del detalle de una póliza.',
                    ]
                }
            ]
        },
        {
            version: '1.37.1',
            launchDate: '14/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego carga manual para seguros grupales y collectivos de personas, propiedades, objetos y por default.',
                    ]
                }
            ]
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
                    ]
                }
            ]
        },
        {
            version: '1.36.2',
            launchDate: '07/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego logica para descargar una copia del documento usado para importar certificados cuando éste contenga errores.'
                    ]
                }
            ]
        },
        {
            version: '1.36.1',
            launchDate: '04/01/2023',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego página para gestionar certificados de una póliza (cancelar, eliminar, buscar, exportar, importar, etc).'
                    ]
                }
            ]
        },
        {
            version: '1.36.0',
            launchDate: '30/12/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizaron la páginas para completar y actualizar pólizas para remover la carga de unidades de una flotilla.',
                        'Se agrego página para exportar e importar unidades a una flotilla'
                    ]
                }
            ]
        },
        {
            version: '1.35.3',
            launchDate: '22/12/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo página para actualizar una póliza para agregar nuevos campos sobre las comisiones.'
                    ]
                }
            ]
        },
        {
            version: '1.35.2',
            launchDate: '20/12/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo página para completar una póliza para agregar nuevos campos sobre las comisiones.'
                    ]
                }
            ]
        },
        {
            version: '1.35.1',
            launchDate: '14/12/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se resolvio bug al intentar ver la información de un contacto desde su código QR.'
                    ]
                }
            ]
        },
        {
            version: '1.35.0',
            launchDate: '14/12/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se agrego botón para descargar reporte de siniestros abiertos.'
                    ]
                }
            ]
        },
        {
            version: '1.34.1',
            launchDate: '29/11/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego vista previa al seleccionar un archivo al cargar una póliza.',
                        'Se agrego aceptación de "/" al capturar y/o actualizar el nombre de un contacto'
                    ]
                }
            ]
        },
        {
            version: '1.34.0',
            launchDate: '29/11/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se integro carga de archivos pesados hasta 10MB al cargar una póliza.'
                    ]
                }
            ]
        },
        {
            version: '1.33.8',
            launchDate: '24/11/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se habilito carga de varias evidencias al reportar un siniestro.'
                    ]
                }
            ]
        },
        {
            version: '1.33.7',
            launchDate: '23/11/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se agrego nuevo evento "Indemnización" al reportar un siniestro.',
                        'Se agrego nuevo flujo para capturar el número de certificado'
                    ]
                }
            ]
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
                        'Se agrego conexión con Stripe para capturar los datos de tarjeta y activar un espacio de trabajo.'
                    ]
                }
            ]
        },
        {
            version: '1.33.5',
            launchDate: '10/11/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se habilito actualización del plan de pago si y solo si la póliza solo es de un pago (pago único o pago anual) y la vigencia de la póliza es de un año o menor.',
                        'Se agrego validación al aplicar un endoso de incremento o decremento de prima para que el monto del endoso sea diferente a cero.'
                    ]
                }
            ]
        },
        {
            version: '1.33.4',
            launchDate: '08/11/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se soluciono bug al aplicar un endoso de incremento de prima y en ese proceso intentar carmbiar el plan de pago; los recibos no se calculaban bien.',
                        'Se soluciono bug al actualizar una póliza de autos individual a autos flotilla'
                    ]
                }
            ]
        },
        {
            version: '1.33.3',
            launchDate: '19/10/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se soluciono bug al cargar y actualizar pólizas de la categoría "Hogar & Propiedades Inmobiliarias".'
                    ]
                }
            ]
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
                    ]
                }
            ]
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
                    ]
                }
            ]
        },
        {
            version: '1.33.0',
            launchDate: '13/10/2022',
            changes: [
                {
                    title: 'Policy Search Engine',
                    items: [
                        'Se página para buscar pólizas de un espacio de trabajo.',
                    ]
                }
            ]
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
                    ]
                }
            ]
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
                    ]
                }
            ]
        },
        {
            version: '1.32.2',
            launchDate: '15/09/2022',
            changes: [
                {
                    title: 'Changelog',
                    items: [
                        'Se actualizo changelog.',
                    ]
                }
            ]
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
                        'Se abrio campo “Capturar evidencia del endoso” para poder seleccionar cualquier tipo de archivo.'
                    ]
                }
            ]
        },
        {
            version: '1.32.0',
            launchDate: '27/08/2022',
            changes: [
                {
                    title: 'Care Center',
                    items: [
                        'Se agrego actualización al reportar un sinisetro.',
                        'Se agrego actualización al ver el historial de un siniestro.'
                    ]
                }
            ]
        },
        {
            version: '1.31.0',
            launchDate: '27/08/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se Se agrego descarga de reporte para las pólizas tipo flotilla.'
                    ]
                }
            ]
        },
        {
            version: '1.30.2',
            launchDate: '24/08/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo la actualización de pólizas para actualizar, eliminar y agregar unidades a una flotilla'
                    ]
                }
            ]
        },
        {
            version: '1.30.1',
            launchDate: '22/08/2022',
            changes: [
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se actualizo la carga de pólizas para integrar la captura de flotillas'
                    ]
                }
            ]
        },
        {
            version: '1.30.0',
            launchDate: '28/07/2022',
            changes: [
                {
                    title: 'App Creator',
                    items: [
                        'Se agrego nuevo tema "Dark Blue"'
                    ]
                },
                {
                    title: 'Smart Wallet',
                    items: [
                        'Se agrego nueva forma de pago "Estado de cuenta"',
                        'Se agregi nuevo plan de pago "Cuatrimestral"',
                        'Se ocultaron los componentes de control por voz al iniciar la app'
                    ]
                },
                {
                    title: 'Angular',
                    items: [
                        'Se actualizo la aplicación de Angular v12 a Angular v14'
                    ]
                }
            ]
        }
    ]

}
