export class FileHelper {
    static checkIfValidFile(fileName: string, fileFormats: string[]): boolean {
        const fileExtension: string = this.getFileExtension(fileName);
        const isValid: boolean = fileFormats.includes(fileExtension);
        return isValid;
    }

    static getFileExtension(fileName: string): string {
        const index: number = fileName.lastIndexOf('.');
        return index !== -1 ? fileName.substring(index + 1) : '';
    }
}
