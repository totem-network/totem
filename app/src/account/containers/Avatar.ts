import { connect } from 'react-redux';
import { IImmutableState } from 'reducers';
import Avatar, { IAvatarProps } from '../components/Avatar';
import profileSelector from '../selectors/profile';

const mapStateToProps = (state: IImmutableState, props: IAvatarProps) => {
    const profile = profileSelector(state, props.address);

    if (!profile) {
        return props;
    }

    return {
        ...props,
        image: profile.image,
    };
};

export default connect(
    mapStateToProps,
)(Avatar as any);
