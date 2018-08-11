import AbstractTransaction from './AbstractTransaction';

export default interface ITransactionFactory {
    createTransaction(): AbstractTransaction;
}
