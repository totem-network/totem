import '@babel/polyfill';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Avatar from 'account/components/Avatar';
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
            const resolveDomainSpy = spy();
            const address = '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9';

            const wrapper = shallow(
                (
                    <Avatar
                        resolveDomain={resolveDomainSpy}
                        address={address}
                    />
                ),
            );

            expect(wrapper.dive().find('img')).to.have.lengthOf(1);
        });

        it('should render the profile image', () => {
            const resolveDomainSpy = spy();
            const image = 'https://ipfs.infura.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';

            const wrapper = shallow(
                (
                    <Avatar
                        resolveDomain={resolveDomainSpy}
                        image={image}
                    />
                ),
            );

            expect(wrapper.dive().find('img')).to.have.lengthOf(1);
        });

        it('should render an error with no arguments', () => {
            const resolveDomainSpy = spy();

            const wrapper = shallow(
                (
                    <Avatar
                        resolveDomain={resolveDomainSpy}
                    />
                ),
            );

            expect(wrapper.dive().find(ErrorOutline)).to.have.lengthOf(1);
        });

        it('should render an error with only image and noProfile', () => {
            const resolveDomainSpy = spy();
            const image = 'https://ipfs.infura.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';
            const noProfile = true;

            const wrapper = shallow(
                (
                    <Avatar
                        resolveDomain={resolveDomainSpy}
                        image={image}
                        noProfile={noProfile}
                    />
                ),
            );

            expect(wrapper.dive().find(ErrorOutline)).to.have.lengthOf(1);
        });

        it('should render an account circle', () => {
            const resolveDomainSpy = spy();
            const domain = 'totem.eth';

            const wrapper = shallow(
                (
                    <Avatar
                        resolveDomain={resolveDomainSpy}
                        domain={domain}
                    />
                ),
            );

            expect(wrapper.dive().find(AccountCircle)).to.have.lengthOf(1);
        });

        it('should resolve the domain when mounted', () => {
            const resolveDomainSpy = spy();
            const domain = 'totem.eth';

            const wrapper = mount(
                (
                    <Avatar
                        resolveDomain={resolveDomainSpy}
                        domain={domain}
                    />
                ),
            );

            expect(resolveDomainSpy.calledOnceWithExactly(domain)).to.be.true;
        });

        it('should resolve the domain when set', () => {
            const resolveDomainSpy = spy();
            const domain = 'totem.eth';

            const wrapper = mount(
                (
                    <Avatar
                        resolveDomain={resolveDomainSpy}
                    />
                ),
            );

            expect(resolveDomainSpy.notCalled).to.be.true;

            wrapper.setProps({
                domain,
                resolveDomain: resolveDomainSpy,
            });

            expect(resolveDomainSpy.calledOnceWithExactly(domain)).to.be.true;
        });
    });
});
