import { mergeResolvers } from 'merge-graphql-schemas';
import CryptoCurrencyResolvers from './file/crypto-currency/resolver';
import DigitalAssetResolvers from './file/digital-asset/resolver';

export default mergeResolvers([
    CryptoCurrencyResolvers,
    DigitalAssetResolvers,
]);
