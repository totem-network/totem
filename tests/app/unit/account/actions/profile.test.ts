import '@babel/polyfill';
import {
    ADD_PROFILE,
    addProfile,
    IAddProfileAction,
} from 'account/actions/profile';
import { expect } from 'chai';
import 'mocha';

describe('Account actions', () => {
    describe('profile', () => {
        it('should create an action to add a profile to state', () => {
            const address = '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9';
            const image = 'https://ipfs.infura.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';
            const name = 'Totem';

            const expectedAction: IAddProfileAction = {
                payload: {
                    address,
                    image,
                    name,
                },
                type: ADD_PROFILE,
            };

            expect(
                addProfile(address, image, name),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
