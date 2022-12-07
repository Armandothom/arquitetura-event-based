import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './services/auth.service';
import { SessionManagerService } from './services/session-manager.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoginService } from './services/login.service';
import { EventsGateway } from './gateway/events.gateway';
import { LoginListener } from './listeners/login.listener';

@Module({
  imports: [
    EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, SessionManagerService, LoginService, LoginListener, AuthService, EventsGateway],
})
export class AppModule {}
