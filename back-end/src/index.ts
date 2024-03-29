import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { ReadlineParser, SerialPort } from 'serialport';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*"
  }
});

const serialPort = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
  autoOpen: false
});

let arrayLampadas: any = {
  lampada1: null,
  lampada2: null,
  lampada3: null,
  lampada4: null
};

const parser = serialPort.pipe(new ReadlineParser());
parser.setMaxListeners(20);

const openSerialPort = () => {
  serialPort.open((err) => {
    if (err) {
      console.error('Erro ao abrir a porta', err.message);
    } else {
      setTimeout(() => {
        serialPort.write('L', (err) => {
          if (err) {
            console.error('Erro ao enviar comando para ligar:', err.message);
          } else {
            console.log('Comando para ligar enviado com sucesso.');
            serialPort.on('data', (data: Buffer) => {
              parser.on('data', function (data) {
                const parsedData = data.trim(); // Remove espaços em branco extras

                // Verifica se os dados têm o formato esperado (por exemplo, "L1-0")
                if (/^L[1-4]-[01]$/.test(parsedData)) {
                  const [lamp, state] = parsedData.split('-');
                  const lampName = 'lampada' + lamp.substring(1);
                  arrayLampadas[lampName] = state === '1';                  
                  io.emit('message', { lampadas: arrayLampadas });
                } else {
                  console.log('Dados recebidos do Arduino estão em formato inválido:', parsedData);
                }
              });              
            });
          }
        });
      }, 1000);

    }
  });


}

const closeSerialPort = () => {
  serialPort.write('D', (err) => { // Enviar 'D' para desligar as lâmpadas
    if (err) {
      console.error('Erro ao enviar comando para desligar:', err.message);
    } else {
      console.log('Comando para desligar enviado com sucesso.');
    }
    serialPort!.close((err) => { // Fechar a porta serial depois de enviar 'D'
      if (err) {
        console.error('Erro ao fechar conexão serial:', err.message);
      } else {
        console.log('Conexão serial fechada.');
        io.emit('message', { status: 'check' });
      }
    });
  });
}

app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', (socket: Socket) => {
  console.log('Conectado!');

  socket.on('disconnect', () => {
    console.log('Desconectado!');
  });

  socket.on('message', (comando: string) => {
    if (comando === 'L') {
      openSerialPort();
    } else if (comando === 'D') {
      closeSerialPort();
    } else {
      console.log('Comando inválido:', comando);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
