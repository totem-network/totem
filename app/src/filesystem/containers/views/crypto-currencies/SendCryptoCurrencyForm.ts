import { reduxForm } from 'redux-form/immutable';
import SendCryptoCurrencyForm, {
    ISendCryptoCurrencyFormData,
    ISendCryptoCurrencyFormProps,
} from './../../../components/views/crypto-currencies/SendCryptoCurrencyForm';
// import validate from './../validators/loginPrivateKey';

const SendCryptoCurrencyFormContainer = reduxForm<ISendCryptoCurrencyFormData, ISendCryptoCurrencyFormProps>({
    form: 'sendCryptoCurrency',
    // validate,
})(SendCryptoCurrencyForm as any);

export default SendCryptoCurrencyFormContainer;
