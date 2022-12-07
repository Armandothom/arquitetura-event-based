export enum EventName {
    LOGIN = "login",
    REGISTER = "register",
    CHECK_SESSION = "checkSession",
    COMMAND_SUCCESS = "commandSuccess",
    COMMAND_ERROR = "commandError",
}

export abstract class Event<T> {
    name : EventName
    payload: T
    constructor(name : EventName, payload : T) {
        this.name = name;
        this.payload = payload;
    }

    protected abstract get isGuarded() : boolean;
}