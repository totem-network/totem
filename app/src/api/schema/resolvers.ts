import { mergeResolvers } from 'merge-graphql-schemas';
import CryptoCurrencyResolvers from './file/crypto-currency/resolver';

export default mergeResolvers([
    CryptoCurrencyResolvers,
]);
