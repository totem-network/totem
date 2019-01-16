import { connect } from 'react-redux';
import { IImmutableState } from 'reducers';
import Name, { INameProps } from '../components/Name';
import profileSelector from '../selectors/profile';

const mapStateToProps = (state: IImmutableState, props: INameProps) => {
    const profile = profileSelector(state, props.address);

    if (!profile) {
        return props;
    }

    return {
        ...props,
        name: profile.name,
    };
};

export default connect(
    mapStateToProps,
)(Name);
