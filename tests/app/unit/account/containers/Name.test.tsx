import '@babel/polyfill';
import Name from 'account/containers/Name';
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
    describe('<Name />', () => {
        it('should render the name', () => {
            const address = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';
            const name = 'Totem';

            const store = mockStore(Map({
                account: Map({
                    profiles: Map({
                        [address]: {
                            name,
                        },
                    }),
                }),
            }));

            const wrapper = mount(
                (   
                    <Provider store={store}>
                        <Name
                            address={address}
                        />
                    </Provider>
                ),
            );

            expect(wrapper.text()).to.be.equal(name);
        });

        it('should render the address', () => {
            const address = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';

            const store = mockStore(Map({
                account: Map({
                    profiles: Map({}),
                }),
            }));

            const wrapper = mount(
                (   
                    <Provider store={store}>
                        <Name
                            address={address}
                        />
                    </Provider>
                ),
            );

            expect(wrapper.text()).to.be.equal(address);
        });
    });
});
