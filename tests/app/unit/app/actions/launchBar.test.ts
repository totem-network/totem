import '@babel/polyfill';
import {
    hideLaunchBar,
    IHideLaunchBarAction,
    IShowLaunchBarAction,
    showLaunchBar,
} from 'app/actions/launchBar';
import { expect } from 'chai';
import 'mocha';
import { spy } from 'sinon';

describe('App actions', () => {
    describe('launchBar', () => {
        it('should create an action to show the launch bar', () => {
            const expectedAction: IShowLaunchBarAction = {
                payload: {},
                type: 'app/SHOW_LAUNCH_BAR',
            };

            expect(
                showLaunchBar(),
            ).to.be.deep.equal(expectedAction);
        });

        it('should create an action to hide the launch bar', () => {
            const expectedAction: IHideLaunchBarAction = {
                payload: {},
                type: 'app/HIDE_LAUNCH_BAR',
            };

            expect(
                hideLaunchBar(),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
