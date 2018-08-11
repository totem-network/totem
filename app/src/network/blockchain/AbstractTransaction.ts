import AbstractAccount from './AbstractAccount';

export interface IReceipt {
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    to?: string;
    contractAddress?: string;
    from: string;
}

export default abstract class AbstractTransaction {

    protected confirmations: number;

    protected receipt: IReceipt | null;

    constructor(receipt?: IReceipt, confirmations?: number) {
        this.receipt = receipt || null;
        this.confirmations = confirmations || 0;
    }

    public abstract sign(account: AbstractAccount): string;

    public abstract verifySignature(account: AbstractAccount): boolean;

    public abstract submit(): boolean;

    public getReceipt(): IReceipt | null {
        return this.receipt;
    }

    public getConfirmations(): number {
        return this.confirmations;
    }

}
