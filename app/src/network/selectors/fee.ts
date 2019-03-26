import { createSelector } from 'reselect';
import { getBlockchainId } from '../utils/blockchain';

const feeSelector = (state: any, platform: string, network: string) => {
    const fees = state.get('network').get('blockchain').get('fees').get(
        getBlockchainId(platform, network),
    );

    return fees;
};

export default createSelector(
    feeSelector,
    (fee) => fee,
);
