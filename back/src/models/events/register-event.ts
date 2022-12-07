import { Event, EventName } from "./event";
import { PayloadEvent } from "./payload-event";

export class RegisterPayload extends PayloadEvent {
    email : string
    password : string
}

export class RegisterEvent extends Event<RegisterPayload> {
    constructor(name : EventName, payload : RegisterPayload) {
        super(name, payload);
    }
    
    protected get isGuarded(): boolean {
        return false;
    }
}