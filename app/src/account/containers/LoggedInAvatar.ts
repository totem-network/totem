import { connect } from 'react-redux';
import { IImmutableState } from 'reducers';
import Avatar, {
    IAvatarProps,
} from '../components/Avatar';
import accountAddressSelector from '../selectors/accountAddress';

// TODO: pass props to component
const mapStateToProps = (state: IImmutableState, props: IAvatarProps) => {
    return {
        ...props,
        address: accountAddressSelector(state),
    };
};

export default connect(
    mapStateToProps,
)(Avatar);
