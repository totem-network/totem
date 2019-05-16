import '@babel/polyfill';
import AvatarComponent from 'account/components/Avatar';
import Avatar from 'account/containers/Avatar';
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
import { spy } from 'sinon';

configureEnzyme({
    adapter: new Adapter(),
});

chaiUse(chaiEnzyme());

const mockStore = configureMockStore();

describe('Account containers', () => {
    describe('<Avatar />', () => {
        it('should resolve the domain when mounted', () => {
            const address = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';
            const domain = 'totem.eth';

            const store = mockStore(Map({
                account: Map({
                    domains: Map({
                        [domain]: address,
                    }),
                    profiles: Map({}),
                }),
            }));

            const wrapper = mount(
                (   
                    <Provider store={store}>
                        <Avatar
                            domain={domain}
                        />
                    </Provider>
                ),
            );

            expect(wrapper.find(AvatarComponent).props().address).to.be.equal(address);
        });

        it('should resolve the domain when mounted', () => {
            const address = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';
            const image = 'https://ipfs.infura.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';

            const store = mockStore(Map({
                account: Map({
                    profiles: Map({
                        [address]: {
                            image,
                        },
                    }),
                }),
            }));

            const wrapper = mount(
                (   
                    <Provider store={store}>
                        <Avatar
                            address={address}
                        />
                    </Provider>
                ),
            );

            expect(wrapper.find(AvatarComponent).props().image).to.be.equal(image);
        });
    });
});
