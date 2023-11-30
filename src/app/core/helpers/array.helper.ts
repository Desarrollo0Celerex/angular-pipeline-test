export class ArrayHelper {
    static findIndex(itemId: string, itemName: string, items: any): number {
        return items.findIndex((value: any) => value[itemName] == itemId);
    }
}
