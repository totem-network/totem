import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import LogoFlat from './../branding/LogoFlat';

interface IBrandingProps {}

interface IBrandingState {}

type BrandingProps = IBrandingProps & WithStyles;

class Branding extends Component<BrandingProps, IBrandingState> {

    public render() {
        const { logo, name, wrapper } = this.props.classes;

        // TODO: only logo in white

        return (
            <div className={wrapper}>
                <div className={logo}>
                    <LogoFlat />
                </div>
            </div>
        );
    }
}

const style: StyleRules = {
    logo:  {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '5vh',
    },
    wrapper: {
        bottom: '5vh',
        position: 'absolute',
        right: '5vw',
    },
};

export default withStyles(style)(Branding);
