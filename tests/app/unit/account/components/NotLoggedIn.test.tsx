import '@babel/polyfill';
import NotLoggedIn from 'account/components/NotLoggedIn';
import {
    expect,
    use as chaiUse,
} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
    configure as configureEnzyme,
    mount,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Map } from 'immutable';
import 'mocha';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

configureEnzyme({
    adapter: new Adapter(),
});

chaiUse(chaiEnzyme());

const mockStore = configureMockStore();

describe('Account containers', () => {
    describe('<NotLoggedIn />', () => {
        it('should render children when logged out', () => {
            const address = '';

            const store = mockStore(Map({
                account: Map({
                    address: Map({
                        account: address,
                    }),
                }),
            }));

            const wrapper = mount(
                (
                    <Provider store={store}>
                        <NotLoggedIn>
                            <div />
                        </NotLoggedIn>
                    </Provider>
                ),
            );

            // tslint:disable-next-line:no-unused-expression
            expect(wrapper.exists('div')).to.be.true;
        });

        it('should not render children when logged in', () => {
            const address = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';

            const store = mockStore(Map({
                account: Map({
                    address: Map({
                        account: address,
                    }),
                }),
            }));

            const wrapper = mount(
                (
                    <Provider store={store}>
                        <NotLoggedIn>
                            <div />
                        </NotLoggedIn>
                    </Provider>
                ),
            );

            // tslint:disable-next-line:no-unused-expression
            expect(wrapper.exists('div')).to.be.false;
        });
    });
});
