import { connect } from 'react-redux';
import { IImmutableState } from 'reducers';
import { bindActionCreators } from 'redux';
import { resolveDomain } from '../actions/domain';
import Avatar, { IAvatarProps } from '../components/Avatar';
import addressByDomainSelector from '../selectors/addressByDomain';
import profileSelector from '../selectors/profile';

const mapStateToProps = (state: IImmutableState, props: any) => {
    let address = props.address;
    if (props.domain && props.domain.endsWith('.eth')) {
        address = addressByDomainSelector(state, props.domain);
    }

    const profile = profileSelector(state, address);

    if (!profile) {
        return {
            ...props,
            address,
        };
    }

    return {
        ...props,
        address,
        image: profile.image,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        resolveDomain,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Avatar as any);
