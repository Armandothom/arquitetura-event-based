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
    cors: true,
  })
  export class EventsGateway {

    @WebSocketServer()
    server: Server;
  

    constructor(private eventEmitter : EventEmitter2) {
    }

    @SubscribeMessage('events')
    handleEventMessage(@MessageBody() data: Event<any>, @ConnectedSocket() socket : any): void {
      console.log(data.name)
      this.eventEmitter.emit(data.name, data);
    }

    private sendMessage(data : Event<any>) {
      this.server.emit("events", data);
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