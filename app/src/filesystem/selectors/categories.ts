import { createSelector } from 'reselect';

const categoriesSelector = (state: any) => {
    return state.get('filesystem').get('categories').toJS();
};

export default createSelector(
    categoriesSelector,
    (categories) => categories,
);
