import { CHANGE_FIELD, CONNECT_TO_SERVER, SERVER_DISCONNECT } from "../action-types";

const initialState = {
    isOnline: true,
    name: 'test',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FIELD:
            return Object.assign({}, state, {
                name: action.value
            });
        case CONNECT_TO_SERVER:
            return Object.assign({}, state, {
                isOnline: true
            });
        case SERVER_DISCONNECT:
            return Object.assign({}, state, {
                isOnline: false
            });
        default:
            return state;
    }
};

export default reducer;