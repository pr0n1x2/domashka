import { CHANGE_FIELD, CONNECT_TO_SERVER, SERVER_DISCONNECT } from "./action-types";

export function changeField(value) {
    return { type: CHANGE_FIELD, value };
}

export const connectToWss = () => {
    return { type: CONNECT_TO_SERVER };
};

export const serverDisconnect = () => {
    return { type: SERVER_DISCONNECT };
};