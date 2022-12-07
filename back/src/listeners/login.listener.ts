import { Injectable } from '@nestjs/common';
import { LoginEvent } from 'src/models/events/login-event';
import { AuthService } from 'src/services/auth.service';
import { UserSession } from 'src/models/user-session';
import { LoginService } from 'src/services/login.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventName } from 'src/models/events/event';

@Injectable()
export class LoginListener {
    constructor(
        private readonly loginService : LoginService,
        private readonly eventEmitter : EventEmitter2) {

    }

  @OnEvent(EventName.LOGIN)
  handleLoginEvent(event: LoginEvent) : void {
    try {
        const userSession = this.loginService.handleLoginEvent(event);
        this.eventEmitter.emit(EventName.COMMAND_SUCCESS, event.payload)
    } catch (error) {
        this.eventEmitter.emit(EventName.COMMAND_ERROR, {error, socketId : event.payload.socketId})
    }
  }
}