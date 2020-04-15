import { mergeResolvers } from 'merge-graphql-schemas';
import CryptoCurrencyResolvers from './crypto-currency/resolver';
import DigitalAssetResolvers from './digital-asset/resolver';
import DomainResolvers from './domain/resolver';
import ImageResolvers from './image/resolver';
import ProfileResolvers from './profile/resolver';

// TODO: decouple redux from resolvers to avoid circular dependencies when usen Worker for api
// add current account and network to the apollo client request header
// then access it via graphql context!
// address: await context.signer.getAddress();

export default mergeResolvers([
    CryptoCurrencyResolvers,
    DigitalAssetResolvers,
    DomainResolvers,
    ImageResolvers,
    ProfileResolvers,
]);
