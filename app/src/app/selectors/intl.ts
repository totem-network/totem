import { createSelector } from 'reselect';
import { IImmutableState } from './../../reducers';

const intlSelector = (state: IImmutableState) => state.get('app').get('intl').toJS();

export default createSelector(
    intlSelector,
    (intl) => {
        return {
            locale: intl.locale,
        };
    },
);
