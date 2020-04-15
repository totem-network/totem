import { fromJS } from 'immutable';
import IImmutableStateMap from 'redux-utils/immutable/IImmutableStateMap';
import { CHANGE_LOCALE, IntlAction } from '../actions/intl';

interface IIntlState {
    locale: string;
}

export interface IImmutableIntlState extends IImmutableStateMap<IIntlState> {}

const initialState = fromJS({
    locale: navigator.language,
});

function intlReducer(state: IImmutableIntlState = initialState, action: IntlAction): IImmutableIntlState {

    switch (action.type) {
        case CHANGE_LOCALE:
            return state.set('locale', action.payload.locale);
    }

    return state;
}

export default intlReducer;
