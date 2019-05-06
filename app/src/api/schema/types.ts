import { mergeTypes } from 'merge-graphql-schemas';
import CryptoCurrencyTypes from './crypto-currency/types.graphql';
import DigitalAssetTypes from './digital-asset/types.graphql';
import ImageTypes from './image/types.graphql';
import UploadTypes from './upload/types.graphql';

export default mergeTypes([
    CryptoCurrencyTypes,
    DigitalAssetTypes,
    ImageTypes,
    UploadTypes,
]);
