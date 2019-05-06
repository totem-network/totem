import { IImmutableState } from 'reducers';
import { createSelector } from 'reselect';

const intlSelector = (state: IImmutableState) => state.get('intl').toJS();

export default createSelector(
    intlSelector,
    (intl) => {
        return {
            locale: intl.locale,
        };
    },
);
