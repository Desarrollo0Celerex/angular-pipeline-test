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
