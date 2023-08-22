declare var ModalPlugin: any;

export class ModalHelper {
    static hide(modalId: string): void {
        ModalPlugin.hide(modalId);
    }

    static show(modalId: string): void {
        ModalPlugin.show(modalId);
    }
}
