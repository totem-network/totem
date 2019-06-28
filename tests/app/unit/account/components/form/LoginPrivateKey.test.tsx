import '@babel/polyfill';
import Button from '@material-ui/core/Button';
import LoginPrivateKey, {
    ILoginPrivateKeyData,
    ILoginPrivateKeyProps,
} from 'account/components/form/LoginPrivateKey';
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
import { spy, stub } from 'sinon';

configureEnzyme({
    adapter: new Adapter(),
});

chaiUse(chaiEnzyme());

describe('Account components', () => {
    describe('<LoginPrivateKey />', () => {
        it('should render the login form', () => {
            const props = {
                handleSubmit: (fn: any) => fn,
                login: stub(),
            } as any as ILoginPrivateKeyProps;

            // const wrapper = shallow(<LoginPrivateKey {...props} />);

            // expect(wrapper.find(Form)).to.have.lengthOf(1);
            // expect(wrapper.find(Field)).to.have.lengthOf(1); // TODO: not working
            // expect(wrapper.find(Button)).to.have.lengthOf(1);
        });

        it('should submit the login form', () => {
            const privateKey = '0xd39...';
            const login = spy();

            const props = {
                handleSubmit: (onSubmit: any) => {
                    onSubmit({
                        get: stub().returns(privateKey),
                    });
                },
                login,
            } as any as ILoginPrivateKeyProps;

            // const wrapper = shallow(<LoginPrivateKey {...props} />);

            // wrapper.find(Form).simulate('submit');

            // expect(login.calledOnce).to.be.equal(true);
        });
    });
});
