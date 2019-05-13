import '@babel/polyfill';
import {
    ADD_DOMAIN,
    addDomain,
    IAddDomainAction,
    IResolveDomainAction,
    RESOLVE_DOMAIN,
    resolveDomain,
} from 'account/actions/domain';
import { expect } from 'chai';
import 'mocha';

describe('Account actions', () => {
    describe('domain', () => {
        it('should create an action to add a domain to the state', () => {
            const domain = 'totem.eth';
            const address = '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9';

            const expectedAction: IAddDomainAction = {
                payload: {
                    address,
                    domain,
                },
                type: ADD_DOMAIN,
            };

            expect(
                addDomain(domain, address),
            ).to.be.deep.equal(expectedAction);
        });

        it('should create an action for a successful login', () => {
            const domain = 'totem.eth';

            const expectedAction: IResolveDomainAction = {
                payload: {
                    domain,
                },
                type: RESOLVE_DOMAIN,
            };

            expect(
                resolveDomain(domain),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
