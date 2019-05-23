import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import yellow from '@material-ui/core/colors/yellow';
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
        color: yellow.A400,
        contrastText: '#333333',
        id: 'images',
        title: 'Images',
    },
    {
        color: green.A400,
        contrastText: '#f8f8f8',
        id: 'music',
        title: 'Music',
    },
    {
        color: orange[500],
        contrastText: '#f8f8f8',
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
