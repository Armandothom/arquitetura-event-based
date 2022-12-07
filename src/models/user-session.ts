import { User } from "./user";

export class UserSession {
    public userInfo : User;
    public token : string;
    private ttl : number;
    private ttlHoursDelta : number = 3;
    constructor(userInfo : User) {
        this.userInfo = userInfo;
        this.refreshTtl();
    }

    public isTtlExpired() {
        return new Date().valueOf() >= this.ttl ? true : false;
    }

    private refreshTtl() {
        const now = new Date();
        this.ttl = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + this.ttlHoursDelta, now.getMinutes(), 0).valueOf();
    }
}