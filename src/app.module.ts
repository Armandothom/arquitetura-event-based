import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './services/auth.service';
import { SessionManagerService } from './services/session-manager.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GatewayModule } from './gateway/gateway.module';
import { LoginService } from './services/login.service';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    GatewayModule],
  controllers: [AppController],
  providers: [AppService, SessionManagerService, LoginService, AuthService],
})
export class AppModule {}
