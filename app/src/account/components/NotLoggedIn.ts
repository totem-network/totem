import { shallowEqual, useSelector } from 'react-redux';
import loggedInSelector from './../selectors/loggedIn';

interface INotLoggedInProps {
    children: any;
}

const NotLoggedIn = ({
    children,
}: INotLoggedInProps) => {
    const loggedIn = useSelector(loggedInSelector, shallowEqual);

    if (!loggedIn) {
        return children;
    }

    return null;
};

export default NotLoggedIn;
