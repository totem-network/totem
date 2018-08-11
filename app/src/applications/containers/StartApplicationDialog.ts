import { reduxForm } from 'redux-form/immutable';
import StartApplicationDialog, {
    IStartApplicationDialogData,
    IStartApplicationDialogProps,
} from './../components/StartApplicationDialog';

export default reduxForm<IStartApplicationDialogData, IStartApplicationDialogProps>({
    form: 'startApplication',
})(StartApplicationDialog);
