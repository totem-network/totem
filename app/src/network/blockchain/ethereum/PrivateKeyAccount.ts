import { IAccountConfig } from './../../actions/blockchain/account';
import AbstractAccount from './../AbstractAccount';

export interface IPrivateKeyAccountConfig extends IAccountConfig {
    privateKey: string;
}

export default class PrivateKeyAccount extends AbstractAccount {

    protected privateKey: string;

    constructor(address: string, privateKey: string) {
        super(address);

        this.privateKey = privateKey;
    }

    public sign(transaction: string): string {
        return '';
    }

}
