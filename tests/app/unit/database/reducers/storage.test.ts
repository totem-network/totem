import '@babel/polyfill';
import { expect } from 'chai';
import storageReducer from 'database/reducers/storage';
import { fromJS, List } from 'immutable';
import 'mocha';

describe('Database reducers', () => {
    describe('storage', () => {
        it('should return the initial state', () => {
            // TODO: add type
            const action = {
                type: '',
            };

            const expectedState = fromJS({
                loading: List<string>(),
            });

            expect(storageReducer(undefined, action)).to.be.deep.equal(expectedState);
        });
    });
});
