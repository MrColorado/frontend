export interface IModeAction {
    type: string
}

export interface IModeState {
    darkMode: boolean
}

export const DarkModeReducer = (state: IModeState, action: IModeAction) => {
    switch (action.type) {
        case "LIGHT": {
            return {
                darkMode: false,
            };
        }
        case "DARK": {
            return {
                darkMode: true,
            };
        }
        case "TOGGLE": {
            return {
                darkMode: !state.darkMode,
            };
        }
        default:
            return state;
    }
};