
export default abstract class AbstractAccount {

    protected address: string;

    constructor(address: string) {
        this.address = address;
    }

    public abstract sign(transaction: string): string;

    // TODO: return BigNumber
    // public abstract getBalance(): number;

    public getAddress(): string {
        return this.address;
    }

}
