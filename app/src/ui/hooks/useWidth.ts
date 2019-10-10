import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';

const useWidth = () => {
    const theme = useTheme() as Theme;
    const keys = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output: any, key: any) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
};

export default useWidth;
