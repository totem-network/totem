import { MockedProvider } from '@apollo/react-testing';
import '@babel/polyfill';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Avatar from 'account/components/Avatar';
import getAvatarByAddressQuery from 'account/queries/getAvatarByAddress.graphql';
import getAvatarByDomainQuery from 'account/queries/getAvatarByDomain.graphql';
import {
    expect,
    use as chaiUse,
} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
    configure as configureEnzyme,
    mount,
    shallow,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import makeBlockie from 'ethereum-blockies-base64';
import 'mocha';
import React from 'react';
import { spy } from 'sinon';

configureEnzyme({
    adapter: new Adapter(),
});

chaiUse(chaiEnzyme());

describe('Account components', () => {
    describe('<Avatar />', () => {
        it('should render the addresses blockie', () => {
            const address = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';

            const apolloMocks = [
                {
                    request: {
                        query: getAvatarByAddressQuery,
                        variables: {
                            address,
                        },
                    },
                    result: {
                        data: {
                            getProfile: {
                                address,
                            },
                        },
                    },
                },
            ];

            /*const wrapper = mount(
                (
                    <MockedProvider mocks={apolloMocks} addTypename={false}>
                        <Avatar
                            address={address}
                        />
                    </MockedProvider>
                ),
            );*/

            // expect(wrapper.find('img')).to.have.lengthOf(1);
        });

        /*it('should render the profile image', () => {
            const image = 'https://ipfs.infura.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';

            const wrapper = shallow(
                (
                    <Avatar />
                ),
            );

            expect(wrapper.dive().find('img')).to.have.lengthOf(1);
        });

        it('should render an error with no arguments', () => {

            const wrapper = shallow(
                (
                    <Avatar />
                ),
            );

            expect(wrapper.dive().find(ErrorOutline)).to.have.lengthOf(1);
        });

        it('should render an error with only image and noProfile', () => {
            const image = 'https://ipfs.infura.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';
            const noProfile = true;

            const wrapper = shallow(
                (
                    <Avatar
                        noProfile={noProfile}
                    />
                ),
            );

            expect(wrapper.dive().find(ErrorOutline)).to.have.lengthOf(1);
        });

        it('should render an account circle', () => {
            const domain = 'totem.eth';

            const wrapper = shallow(
                (
                    <Avatar
                        domain={domain}
                    />
                ),
            );

            expect(wrapper.dive().find(AccountCircle)).to.have.lengthOf(1);
        });

        it('should resolve the domain when mounted', () => {
            const domain = 'totem.eth';

            const wrapper = mount(
                (
                    <Avatar
                        domain={domain}
                    />
                ),
            );
        });

        it('should resolve the domain when set', () => {
            const resolveDomainSpy = spy();
            const domain = 'totem.eth';

            const wrapper = mount(
                (
                    <Avatar />
                ),
            );

            wrapper.setProps({
                domain,
                resolveDomain: resolveDomainSpy,
            });
        });*/
    });
});
