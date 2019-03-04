import { IAccountConfig } from '../actions/blockchain/accounts';
import AbstractAccount from './AbstractAccount';

export default interface IAccountFactory {
    createAccount(config: IAccountConfig): AbstractAccount;
}
