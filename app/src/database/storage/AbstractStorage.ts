
export interface IStorage {

    create(content: any): string;

    delete(hash: string): boolean;

    read(hash: string): any;

    update(hash: string): boolean;

}

export default abstract class AbstractStorage implements IStorage {

    // TODO: returns hash
    public abstract create(content: any): string;

    public abstract delete(hash: string): boolean;

    // TODO: returns content
    public abstract read(hash: string): any;

    public abstract update(hash: string): boolean;

}
