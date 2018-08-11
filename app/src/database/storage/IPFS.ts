import AbstractStorage from './AbstractStorage';

export default class IPFS extends AbstractStorage {

    public create(content: any): string {
        return '';
    }

    public delete(hash: string): boolean {
        return true;
    }

    public read(hash: string): any {
        return;
    }

    public update(hash: string): boolean {
        return true;
    }

}
