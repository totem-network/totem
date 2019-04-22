import { mergeResolvers } from 'merge-graphql-schemas';
import CryptoCurrencyResolvers from './crypto-currency/resolver';
import DigitalAssetResolvers from './digital-asset/resolver';
import ImageResolvers from './image/resolver';

export default mergeResolvers([
    CryptoCurrencyResolvers,
    DigitalAssetResolvers,
    ImageResolvers,
]);
