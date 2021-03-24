export const ADD_DATA = data => {
        return {
                type: 'ADD_DATA',
                payload: data
        };
};

export const ADD_COLUMNS = data => {
        return {
                type: 'ADD_COLUMNS',
                payload: data
        };
};
export const SHOW_MODAL = data => {
    return {
        type: 'SHOW_MODAL',
        payload: data
    };
};
