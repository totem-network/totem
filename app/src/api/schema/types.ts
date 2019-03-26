import { mergeTypes } from 'merge-graphql-schemas';
import CryptoCurrencyTypes from './file/crypto-currency/types.graphql';
import DigitalAssetTypes from './file/digital-asset/types.graphql';
import ImageTypes from './file/image/types.graphql';

export default mergeTypes([
    CryptoCurrencyTypes,
    DigitalAssetTypes,
    ImageTypes,
]);
