export abstract class DumbComponent {
    private readonly subClassConstructor: Function;
    private readonly subClassNgOnInit: Function;

    protected constructor() {
        this.subClassConstructor = this.constructor;
        if (this._isEmptyConstructor() || arguments.length !== 0) {
            this._throwError('it should not inject services');
        }

        this.subClassNgOnInit = (this as any).ngOnInit;
        if (this.subClassNgOnInit) {
            this._throwError('it should not use ngOnInit');
        }
    }

    private _isEmptyConstructor(): boolean {
        return this.subClassConstructor.toString().split('(')[1][0] !== ')';
    }

    private _throwError(reason: string): void {
        throw new Error(
            `Component ${this.subClassConstructor.name} is a DumbComponent, ${reason}.`
        );
    }
}
