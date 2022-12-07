import { Event, EventName } from "./event";
import { PayloadEvent } from "./payload-event";

export class CheckSessionPayload extends PayloadEvent {
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