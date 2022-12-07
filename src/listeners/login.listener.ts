import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventName } from 'src/models/events/event';
import { LoginEvent } from 'src/models/events/login-event';
import { AuthService } from 'src/services/auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class LoginListener {
    constructor(
        private readonly authService : AuthService,
        private readonly eventEmitter : EventEmitter2) {

    }

  @OnEvent(EventName.LOGIN)
  handleLoginEvent(event: LoginEvent) {
    try {
        const userSession = this.authService.login(event.payload.email, event.payload.password);
        this.eventEmitter.emit(EventName.COMMAND_SUCCESS, userSession);
    } catch (error) {
        if(error.code == 401) {
            this.eventEmitter.emit(EventName.COMMAND_ERROR, error);
        }
    }
  }
}