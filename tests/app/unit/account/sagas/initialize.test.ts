import '@babel/polyfill';
import { IInitializeAction, web3Initialized } from 'app/actions/initialize';
import { setProvidedAccounts } from 'account/actions/providedAccounts';
import { addProfile } from 'account/actions/profile';
import initializeSaga from 'account/sagas/initialize';
import { expect } from 'chai';
import { Map } from 'immutable';
import 'mocha';
import { call, put, take } from 'redux-saga/effects';
import { stub } from 'sinon';

describe('Account sagas', () => {
    describe('initialize', () => {
        it('should initialize with provided accounts', async () => {
            const generator = initializeSaga();

            const accounts = [
                '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
            ];

            const action: IInitializeAction = {
                type: 'app/INITIALIZE',
                payload: {
                    ethereum: {
                        enable: stub().returns(accounts),
                    },
                },
            };

            const boxImport = {
                default: {
                    getProfile: stub(),
                },
            };

            const profile = {
                name: 'Totem',
                image: [
                    {
                        contentUrl: {
                            '/': 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
                        },
                    },
                ],
            };

            expect(generator.next().value).to.be.deep.equal(
                take('app/INITIALIZE'),
            );

            expect(generator.next(action).value).to.be.deep.equal(
                call(action.payload.ethereum.enable),
            );

            expect(generator.next(accounts).value).to.be.deep.equal(
                put(web3Initialized()),
            );

            expect(generator.next().value).to.be.deep.equal(
                put(setProvidedAccounts(accounts)),
            );

            // imports 3box dynamicaly
            generator.next();

            expect(generator.next(boxImport).value).to.be.deep.equal(
                call(boxImport.default.getProfile, accounts[0]),
            );

            expect(generator.next(profile).value).to.be.deep.equal(
                put(addProfile(
                        '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
                        'https://ipfs.infura.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
                        'Totem',
                    )
                ),
            );

            expect(generator.next().done).to.be.true;
        });
    });
});
