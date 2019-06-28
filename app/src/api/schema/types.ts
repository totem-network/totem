import { mergeTypes } from 'merge-graphql-schemas';
import CryptoCurrencyTypes from './crypto-currency/types.graphql';
import DigitalAssetTypes from './digital-asset/types.graphql';
import DomainTypes from './domain/types.graphql';
import ImageTypes from './image/types.graphql';
import ProfileTypes from './profile/types.graphql';
import UploadTypes from './upload/types.graphql';

export default mergeTypes([
    CryptoCurrencyTypes,
    DigitalAssetTypes,
    DomainTypes,
    ImageTypes,
    ProfileTypes,
    UploadTypes,
]);
