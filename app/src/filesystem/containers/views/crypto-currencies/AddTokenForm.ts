import { reduxForm } from 'redux-form/immutable';
import AddTokenForm, {
    IAddTokenFormData,
    IAddTokenFormProps,
} from './../../../components/views/crypto-currencies/AddTokenForm';
// import validate from './../validators/loginPrivateKey';

const AddTokenFormContainer = reduxForm<IAddTokenFormData, IAddTokenFormProps>({
    form: 'addToken',
    // validate,
})(AddTokenForm as any);

export default AddTokenFormContainer;
