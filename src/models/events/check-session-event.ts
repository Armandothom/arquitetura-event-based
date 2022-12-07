import { Event, EventName } from "./event";

export class CheckSessionPayload {
    email : string
    password : string
}

export class CheckSessionEvent extends Event<CheckSessionPayload> {
    constructor(name : EventName, payload : CheckSessionPayload) {
        super(name, payload);
    }

    protected get isGuarded(): boolean {
        return true;
    }
}