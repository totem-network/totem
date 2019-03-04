import { reduxForm } from 'redux-form/immutable';
import AddDigitalAssetForm, {
    IAddDigitalAssetFormData,
    IAddDigitalAssetFormProps,
} from '../../../components/types/digital-assets/AddDigitalAssetForm';
// import validate from './../validators/loginPrivateKey';

const AddDigitalAssetFormContainer = reduxForm<IAddDigitalAssetFormData, IAddDigitalAssetFormProps>({
    form: 'addDigitalAsset',
    // validate,
})(AddDigitalAssetForm as any);

export default AddDigitalAssetFormContainer;
