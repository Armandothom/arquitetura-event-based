import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
import { Event, EventName } from 'src/models/events/event';
import { PayloadEvent } from 'src/models/events/payload-event';
  
  @WebSocketGateway({
    cors: true,
  })
  export class EventsGateway {

    @WebSocketServer()
    server: Server;

    constructor(private eventEmitter : EventEmitter2) {}

    @SubscribeMessage('events')
    handleEventMessage(@MessageBody() data: Event<any>): void {
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