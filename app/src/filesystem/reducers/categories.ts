import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import yellow from '@material-ui/core/colors/yellow';
import {
    List,
} from 'immutable';

interface ICategoriesState {
    colorFrom: string;
    colorTo: string;
    contrastText?: string;
    id: string;
    title: string;
}

export interface IImmutableCategoriesState extends List<ICategoriesState> {}

const initialState = List<ICategoriesState>([
    {
        colorFrom: blue[400],
        colorTo: blue[700],
        contrastText: '#f8f8f8',
        id: 'crypto-currencies',
        title: 'Crypto Currencies',
    },
    {
        colorFrom: pink.A200,
        colorTo: pink.A700,
        contrastText: '#f8f8f8',
        id: 'digital-assets',
        title: 'Digital Assets',
    },
    {
        colorFrom: orange.A200,
        colorTo: yellow.A400,
        contrastText: '#f8f8f8',
        id: 'images',
        title: 'Images',
    },
    {
        colorFrom: green.A700,
        colorTo: green.A200,
        contrastText: '#f8f8f8',
        id: 'music',
        title: 'Music',
    },
    {
        colorFrom: orange[500],
        colorTo: orange[800],
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
