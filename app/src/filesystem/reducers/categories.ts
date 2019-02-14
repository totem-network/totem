import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import {
    List,
} from 'immutable';

interface ICategoriesState {
    color: string;
    contrastText?: string;
    id: string;
    title: string;
}

export interface IImmutableCategoriesState extends List<ICategoriesState> {}

const initialState = List<ICategoriesState>([
    {
        color: blue[400],
        contrastText: '#f8f8f8',
        id: 'crypto-currencies',
        title: 'Crypto Currencies',
    },
    {
        color: pink.A200,
        contrastText: '#f8f8f8',
        id: 'digital-assets',
        title: 'Digital Assets',
    },
    {
        color: '#dddd22',
        id: 'images',
        title: 'Images',
    },
    {
        color: '#dddd22',
        id: 'music',
        title: 'Music',
    },
    {
        color: '#dddd22',
        id: 'videos',
        title: 'Videos',
    },
]);

function instancesReducer(
    state: IImmutableCategoriesState = initialState,
    action: any,
): IImmutableCategoriesState {

    switch (action.type) {
        //
    }

    return state;
}

export default instancesReducer;
