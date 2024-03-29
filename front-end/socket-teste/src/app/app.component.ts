import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socket-teste';
  newMessage = '';
  receiveMensage: string = "";
  messageList: string[] = [];
  teste: string = "";
  tempo: string = "";
  lampada1: string = "";
  lampada2: string = "";
  lampada3: string = "";
  lampada4: string = "";

  constructor(private chatService: SocketService) {

  }

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message: any) => {
      console.log(message);
      if (message && message.lampadas) {
        this.messageList = [];
        this.messageList.push(message)
        this.lampada1 = message.lampadas.lampada1 == 1 ? 'LIGADO' : 'DESLIGADO';
        this.lampada2 = message.lampadas.lampada2 == 1 ? 'LIGADO' : 'DESLIGADO';
        this.lampada3 = message.lampadas.lampada3 == 1 ? 'LIGADO' : 'DESLIGADO';
        this.lampada4 = message.lampadas.lampada4 == 1 ? 'LIGADO' : 'DESLIGADO';
        this.receiveMensage = message.lampadas;
      }
      // Verificar se o status de verificação foi recebido
      if (message.status && message.status === 'check') {        // Executar lógica com base no status de verificação
        {          
          this.lampada1 = "";
          this.lampada2 = "";
          this.lampada3 = "";
          this.lampada4 = "";
        }
      }
    });
  }

  sendMessage(comando: string) {
    this.chatService.sendMessage(comando);
    this.newMessage = '';

  }
}
