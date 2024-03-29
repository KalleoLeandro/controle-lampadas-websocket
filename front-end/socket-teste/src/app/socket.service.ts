import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  socket = io('http://127.0.0.1:3000/');

  constructor() {}
 

  public sendMessage(message: any) {    
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{      
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };
}
