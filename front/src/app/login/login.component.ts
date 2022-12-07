import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]);
  password = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {
    
  }

  login() {
    const subject = webSocket('ws://localhost:3000');
    const email = this.email.value as string;
    const password = this.password.value as string;

    subject.subscribe(
      msg => console.log('message received: ' + msg),
      err => console.log(err),
      () => console.log('complete')
    );

    subject.next({message: 'login', payload: {email: '', password: ''}});
    subject.complete();
  }

}
