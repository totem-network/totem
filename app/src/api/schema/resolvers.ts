import { mergeResolvers } from 'merge-graphql-schemas';
import CryptoCurrencyResolvers from './crypto-currency/resolver';
import DigitalAssetResolvers from './digital-asset/resolver';
import DomainResolvers from './domain/resolver';
import ImageResolvers from './image/resolver';
import ProfileResolvers from './profile/resolver';

export default mergeResolvers([
    CryptoCurrencyResolvers,
    DigitalAssetResolvers,
    DomainResolvers,
    ImageResolvers,
    ProfileResolvers,
]);
