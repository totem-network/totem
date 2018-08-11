
// TODO: abi type
export default abstract class AbstractContract {

    protected abi: object;

    constructor(abi: object) {
        this.abi = abi;
    }

    public abstract deploy(): any;

    public abstract call(method: string): any;

    public abstract send(method: string): any;

    public getAbi(): object {
        return this.abi;
    }

}
