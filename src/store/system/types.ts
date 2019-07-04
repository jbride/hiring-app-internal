// Describing the shape of the system's slice of state
export interface ISystemState {
    isDropdownOpen: boolean;
    areTasksOpen: boolean;
    isAboutOpen: boolean;
}

// Describing the different ACTION NAMES available
export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export const SELECT_DROPDOWN = 'SELECT_DROPDOWN';
export const SELECT_TASKS = 'SELECT_TASKS';
export const TOGGLE_TASKS = 'TOGGLE_TASKS';
export const TOGGLE_ABOUT = 'TOGGLE_ABOUT';

interface IToggleDropdownAction {
    type: typeof TOGGLE_DROPDOWN;
    isDropdownOpen: boolean
}

interface ISelectDropdownAction {
    type: typeof SELECT_DROPDOWN
}

interface IToggleTasksAction {
    type: typeof TOGGLE_TASKS,
    isDropdownOpen: boolean
}

interface ISelectTasksAction {
    type: typeof SELECT_TASKS
}

interface IToggleAboutAction {
    type: typeof TOGGLE_ABOUT
}

export type SystemActionTypes = IToggleDropdownAction | ISelectDropdownAction 
                                | IToggleTasksAction | ISelectTasksAction
                                | IToggleAboutAction;

