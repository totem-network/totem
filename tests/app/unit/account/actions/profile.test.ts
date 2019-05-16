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
            const address = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';
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
