import '@babel/polyfill';
import LoginMessage from 'account/components/LoginMessage';
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
    describe('<LoginMessage />', () => {
        it('should render "Welcome"', () => {
            const wrapper = render(<LoginMessage />);

            expect(wrapper.text()).to.contain('Welcome');
        });
    });
});
