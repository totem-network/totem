import { IAccountConfig } from './../../actions/blockchain/account';
import AbstractAccount from './../AbstractAccount';
import IAccountFactory from './../IAccountFactory';
import PrivateKeyAccount, { IPrivateKeyAccountConfig } from './PrivateKeyAccount';

export enum Method {
    LEDGER = 'LEDGER',
    METAMASK = 'METAMASK',
    PRIVATE_KEY = 'PRIVATE_KEY',
}

export default class AccountFactory implements IAccountFactory {

    public createAccount(config: IAccountConfig): AbstractAccount {
        switch (config.method) {
            case Method.PRIVATE_KEY:
                const privateKey = (config as IPrivateKeyAccountConfig).privateKey;
                return new PrivateKeyAccount('', privateKey);
            default:
                throw new Error('No method set');
        }
    }

}
