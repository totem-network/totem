import { mergeTypes } from 'merge-graphql-schemas';
import CryptoCurrencyTypes from './file/crypto-currency/types.graphql';

export default mergeTypes([
    CryptoCurrencyTypes,
]);
