import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './services/auth.service';
import { SessionManagerService } from './services/session-manager.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, SessionManagerService, AuthService],
})
export class AppModule {}
