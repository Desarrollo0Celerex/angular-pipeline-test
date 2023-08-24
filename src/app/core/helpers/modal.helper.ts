declare var ModalPlugin: any;

export class ModalHelper {
    static hide(modalId: string): void {
        ModalPlugin.hide(modalId);
    }

    static show(modalId: string): void {
        setTimeout(() => {
            ModalPlugin.show(modalId);
        }, 0);
    }
}
