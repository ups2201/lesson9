import { Reducer } from "redux";

export type State = {
    isLoading: boolean;
    currentCity: any | undefined;
    error: Error | undefined;
};

const initialState: State = {
    isLoading: false,
    currentCity: undefined,
    error: undefined,
};

export const apiReducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, isLoading: true };
        case "SUCCESS":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
                error: undefined,
            };
        case "ERROR":
            return {
                ...state,
                isLoading: false,
                currentCity: undefined,
                error: action.error,
            };
        default:
            return state;
    }
};
