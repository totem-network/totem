import { shallowEqual, useSelector } from 'react-redux';
import loggedInSelector from './../selectors/loggedIn';

interface ILoggedInProps {
    children: any;
}

const LoggedIn = ({
    children,
}: ILoggedInProps) => {
    const loggedIn = useSelector(loggedInSelector, shallowEqual);

    if (loggedIn) {
        return children;
    }

    return null;
};

export default LoggedIn;
