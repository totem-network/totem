import '@babel/polyfill';
import { expect } from 'chai';
import {
    STORAGE_READ,
    STORAGE_READ_ERROR,
    STORAGE_READ_SUCCESS,
    storageRead,
    storageReadError,
    storageReadSuccess,
} from 'database/actions/storage';
import 'mocha';

describe('Database actions', () => {
    describe('storage', () => {
        it('should create an action to read from storage', () => {
            // TODO: add hash
            const hash = 'testhash';
            const loader = 'ipfs';

            const expectedAction = {
                payload: {
                    hash,
                    loader,
                },
                type: STORAGE_READ,
            };

            expect(storageRead(hash, loader)).to.be.deep.equal(expectedAction);
        });

        it('should create an action that a read from storage was successful', () => {
            // TODO: add realistic values
            const hash = 'testhash';
            const loader = 'swarm';
            const data = 'some file contents';

            const expectedAction = {
                payload: {
                    data,
                    hash,
                    loader,
                },
                type: STORAGE_READ_SUCCESS,
            };

            expect(storageReadSuccess(data, hash, loader)).to.be.deep.equal(expectedAction);
        });

        it('should create an action that a read from storage failed', () => {
            const hash = 'testhash';
            const loader = 'swarm';
            const error = 'some error';

            const expectedAction = {
                payload: {
                    error,
                    hash,
                    loader,
                },
                type: STORAGE_READ_ERROR,
            };

            expect(storageReadError(error, hash, loader)).to.be.deep.equal(expectedAction);
        });
    });
});
