import { Injectable } from '@nestjs/common';
import { LoginEvent } from 'src/models/events/login-event';
import { AuthService } from 'src/services/auth.service';
import { UserSession } from 'src/models/user-session';

@Injectable()
export class LoginService {
    constructor(
        private readonly authService : AuthService) {

    }

  handleLoginEvent(event: LoginEvent) : UserSession {
    try {
        const userSession = this.authService.login(event.payload.email, event.payload.password);
        return userSession;
    } catch (error) {
        throw error
    }
  }
}