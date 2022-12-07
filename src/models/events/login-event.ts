import { Event, EventName } from "./event";

export class LoginPayload {
    email : string
    password : string
}

export class LoginEvent extends Event<LoginPayload> {
    constructor(name : EventName, payload : LoginPayload) {
        super(name, payload);
    }

    protected get isGuarded(): boolean {
        return false;
    }
}