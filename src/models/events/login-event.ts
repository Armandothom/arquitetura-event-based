import { Event, EventName } from "./event";
import { PayloadEvent } from "./payload-event";

export class LoginPayload extends PayloadEvent {
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