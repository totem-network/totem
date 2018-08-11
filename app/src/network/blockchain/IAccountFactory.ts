import { IAccountConfig } from './../actions/blockchain/account';
import AbstractAccount from './AbstractAccount';

export default interface IAccountFactory {
    createAccount(config: IAccountConfig): AbstractAccount;
}
