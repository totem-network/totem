import { mergeTypes } from 'merge-graphql-schemas';
import CryptoCurrencyTypes from './file/crypto-currency/types.graphql';
import DigitalAssetTypes from './file/digital-asset/types.graphql';

export default mergeTypes([
    CryptoCurrencyTypes,
    DigitalAssetTypes,
]);
