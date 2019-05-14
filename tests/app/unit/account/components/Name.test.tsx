import '@babel/polyfill';
import Name from 'account/components/Name';
import {
    expect,
    use as chaiUse,
} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
    configure as configureEnzyme,
    render,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mocha';
import React from 'react';

configureEnzyme({
    adapter: new Adapter(),
});

chaiUse(chaiEnzyme());

describe('Account components', () => {
    describe('<Name />', () => {
        it('should render the name', () => {
            const address = '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9';
            const name = 'Totem';

            const wrapper = render(
                (
                    <Name
                        address={address}
                        name={name}
                    />
                ),
            );

            expect(wrapper.text()).to.contain(name);
        });

        it('should render the address', () => {
            const address = '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9';

            const wrapper = render(
                (
                    <Name
                        address={address}
                    />
                ),
            );

            expect(wrapper.text()).to.contain(address);
        });
    });
});
