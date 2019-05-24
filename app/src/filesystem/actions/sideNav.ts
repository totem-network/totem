import { Action } from 'redux';

// side nav select category

export type SIDE_NAV_SELECT_CATEGORY = 'filesystem/SIDE_NAV_SELECT_CATEGORY';
export const SIDE_NAV_SELECT_CATEGORY: SIDE_NAV_SELECT_CATEGORY = 'filesystem/SIDE_NAV_SELECT_CATEGORY';

export interface ISideNavSelectCategoryAction extends Action {
    type: SIDE_NAV_SELECT_CATEGORY;
    payload: ISideNavSelectCategoryPayload;
}

export interface ISideNavSelectCategoryPayload {
    category: string;
}

export function sideNavSelectCategory(
    category: string,
): ISideNavSelectCategoryAction {
    return {
        payload: {
            category,
        },
        type: SIDE_NAV_SELECT_CATEGORY,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type SideNavAction = ISideNavSelectCategoryAction |
        IOtherAction;
