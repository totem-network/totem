import { reduxForm } from 'redux-form/immutable';
import SendDigitalAssetForm, {
    ISendDigitalAssetFormData,
    ISendDigitalAssetFormProps,
} from './../../../components/views/digital-assets/SendDigitalAssetForm';
// import validate from './../validators/loginPrivateKey';

const SendDigitalAssetFormContainer = reduxForm<ISendDigitalAssetFormData, ISendDigitalAssetFormProps>({
    form: 'sendDigitalAsset',
    // validate,
})(SendDigitalAssetForm as any);

export default SendDigitalAssetFormContainer;
