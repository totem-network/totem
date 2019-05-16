import '@babel/polyfill';
import {
    ILoginSuccessAction,
    LoginAction,
    LOGIN_SUCCESS,
} from 'account/actions/login';
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
            const action: LoginAction = {
                type: '',
            };

            const expectedState = fromJS({
                account: null,
            });

            expect(addressReducer(undefined, action)).to.be.deep.equal(expectedState);
        });

        it('should set the address of the state', () => {
            const action: ILoginSuccessAction = {
                payload: {
                    address: '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
                },
                type: LOGIN_SUCCESS,
            };

            const expectedState = fromJS({
                account: '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
            });

            expect(addressReducer(undefined, action)).to.be.deep.equal(expectedState);
        });
    });
});
