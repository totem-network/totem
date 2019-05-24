import { Action } from 'redux';

// select category

export type SELECT_CATEGORY = 'filesystem/SELECT_CATEGORY';
export const SELECT_CATEGORY: SELECT_CATEGORY = 'filesystem/SELECT_CATEGORY';

export interface ISelectCategoryAction extends Action {
    type: SELECT_CATEGORY;
    payload: ISelectCategoryPayload;
}

export interface ISelectCategoryPayload {
    category: string;
    instance: string;
}

export function selectCategory(
    instance: string,
    category: string,
): ISelectCategoryAction {
    return {
        payload: {
            category,
            instance,
        },
        type: SELECT_CATEGORY,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type InstancesAction = ISelectCategoryAction |
        IOtherAction;
