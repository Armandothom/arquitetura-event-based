import { Event, EventName } from "./event";

export class RegisterPayload {
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