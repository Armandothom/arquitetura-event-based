import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { webSocket } from "rxjs/webSocket";
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  socket : Socket
  email = new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]);
  password = new FormControl('', Validators.required);

  constructor() { 
    this.socket = new Socket({url : "http://localhost:3000"})
    this.socket.fromEvent("events").subscribe(() => {})
  }

  ngOnInit(): void {}

  login() {
    const email = this.email.value as string;
    const password = this.password.value as string;
    this.socket.emit("events", {name: 'login', payload: {email: email, password: password}})
  }
}
