import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from 'src/models/user-session';

@Injectable()
export class SessionManagerService {
    private sessions : Array<UserSession>;
    private delaySessionCheck : number = 5000;
    
    constructor() {
        this.sessions = new Array();
        setInterval(() => {
            this.removeExpiredSessions();
        }, this.delaySessionCheck);
    }

    private removeExpiredSessions() {
        for (const session of this.sessions) {
            if(session.isTtlExpired()) this.removeSession(session);
        }
    }

    public removeSession(session : UserSession) {
        const indexSession = this.sessions.findIndex((sessionListed) => sessionListed.token == session.token);
        if(indexSession == -1) throw new NotFoundException("Sessão não encontrada");
        this.sessions.splice(indexSession, 1);
    }

    public insertSession(session : UserSession) {
        this.sessions.push(session);
    }
}
