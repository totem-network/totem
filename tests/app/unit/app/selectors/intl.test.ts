import '@babel/polyfill';
import intlSelector from 'app/selectors/intl';
import { expect } from 'chai';
import { Map } from 'immutable';
import 'mocha';

describe('App selectors', () => {
    describe('intl', () => {
        it('should return the internationalization config from the state', () => {
            const locale = 'en-US';

            const state = Map({
                app: Map({
                    intl: Map({
                        locale,
                    }),
                }),
            }) as any;

            const expectedResult = {
                locale,
            };

            expect(
                intlSelector(state),
            ).to.be.deep.equal(expectedResult);
        });
    });
});
