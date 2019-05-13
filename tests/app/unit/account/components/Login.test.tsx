import '@babel/polyfill';
import Login from 'account/components/Login';
import LoginMessage from 'account/components/LoginMessage';
import {
    expect,
    use as chaiUse,
} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
    configure as configureEnzyme,
    shallow,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mocha';
import React from 'react';

configureEnzyme({
    adapter: new Adapter(),
});

chaiUse(chaiEnzyme());

describe('Account components', () => {
    describe('<Login />', () => {
        it('should render the login message', () => {
            const wrapper = shallow(<Login />);

            expect(wrapper.dive().find(LoginMessage)).to.have.lengthOf(1);
        });
    });
});
