import '@babel/polyfill';
import { LOGIN_SUCCESS } from 'account/actions/login';
import addressReducer from 'account/reducers/address';
import {
    expect,
    use as chaiUse,
} from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS, List } from 'immutable';
import 'mocha';

chaiUse(chaiImmutable);

describe('Account reducers', () => {
    describe('address', () => {
        it('should return the initial state', () => {
            // TODO: add type
            const action = {
                type: '',
            };

            const expectedState = fromJS({
                account: null,
            });

            expect(addressReducer(undefined, action)).to.be.deep.equal(expectedState);
        });

        it('should set the address of the state', () => {
            // TODO: add type
            const action = {
                payload: {
                    address: '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9',
                },
                type: LOGIN_SUCCESS,
            };

            const expectedState = fromJS({
                account: '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9',
            });

            expect(addressReducer(undefined, action)).to.be.deep.equal(expectedState);
        });
    });
});
