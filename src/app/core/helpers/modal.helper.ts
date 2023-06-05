declare var ModalPlugin: any;

export class ModalHelper {
    static hideModal(modalId: string): void {
        ModalPlugin.hide(modalId);
    }

    static showModal(modalId: string): void {
        ModalPlugin.show(modalId);
    }
}
