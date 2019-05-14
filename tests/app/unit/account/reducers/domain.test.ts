import '@babel/polyfill';
import {
    ADD_DOMAIN,
    DomainAction,
    IAddDomainAction,
} from 'account/actions/domain';
import domainsReducer from 'account/reducers/domains';
import {
    expect,
    use as chaiUse,
} from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS } from 'immutable';
import 'mocha';

chaiUse(chaiImmutable);

describe('Account reducers', () => {
    describe('domain', () => {
        it('should return the initial state', () => {
            const action: DomainAction = {
                type: '',
            };

            const expectedState = fromJS({});

            expect(domainsReducer(undefined, action)).to.be.deep.equal(expectedState);
        });

        it('should add a domain to the state', () => {
            const action: IAddDomainAction = {
                payload: {
                    address: '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9',
                    domain: 'totem.eth',
                },
                type: ADD_DOMAIN,
            };

            const expectedState = fromJS({
                'totem.eth': '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9',
            });

            expect(domainsReducer(undefined, action)).to.be.deep.equal(expectedState);
        });
    });
});
