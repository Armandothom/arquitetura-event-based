import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userListMock } from 'src/mock-data/user-list-mock';
import { UserSession } from 'src/models/user-session';
import { SessionManagerService } from './session-manager.service';

@Injectable()
export class AuthService {
    private userListMock = userListMock
    constructor(
        private readonly sessionManagerService : SessionManagerService,
    ) {

    }

    public login(email : string, password : string) : UserSession {
        const user = this.userListMock.find((userListed) => userListed.email == email && userListed.password == password); 
        if(user) {
            const newSession = new UserSession(user);
            this.sessionManagerService.insertSession(newSession);
            return newSession;
        } else {
            throw new UnauthorizedException("Login ou senha inválidos");
        }
    }
}
