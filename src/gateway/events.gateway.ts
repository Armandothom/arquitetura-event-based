import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server } from 'socket.io';
import { Event, EventName } from 'src/models/events/event';
import { PayloadEvent } from 'src/models/events/payload-event';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class EventsGateway {

    constructor(private eventEmitter : EventEmitter2) {
    }

    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('events')
    handleEventMessage(@MessageBody() data: Event<any>, @ConnectedSocket() socket : any): void {
      this.eventEmitter.emit(data.name, {socketId : socket});
    }

    private sendMessage(data : Event<any>) {
      this.server.emit(data.name, data.payload);
    }

    @OnEvent(EventName.COMMAND_SUCCESS)
    private successMessage(data : Event<PayloadEvent>) {
      this.sendMessage(data)
    }

    @OnEvent(EventName.COMMAND_ERROR)
    private errorMessage(data : Event<PayloadEvent>) {
      this.sendMessage(data)
    }

  }