<div align="center">

# Controle de Lâmpadas | WebSocket & Arduino

### Demonstração de acionamento e comunicação entre interface web, Node.js e dispositivo serial, com atualizações via Socket.IO.

[![GitHub](https://img.shields.io/badge/Ver_no_GitHub-181717?style=for-the-badge&logo=github)](https://github.com/KalleoLeandro/controle-lampadas-websocket)
![Documentação](https://img.shields.io/badge/Documentação-pt--BR-0F766E?style=for-the-badge)

![Angular](https://img.shields.io/badge/Angular-26364A?style=for-the-badge&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-26364A?style=for-the-badge&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-26364A?style=for-the-badge&logoColor=white) ![Socket.IO](https://img.shields.io/badge/Socket.IO-26364A?style=for-the-badge&logoColor=white) ![SerialPort](https://img.shields.io/badge/SerialPort-26364A?style=for-the-badge&logoColor=white) ![Arduino](https://img.shields.io/badge/Arduino-26364A?style=for-the-badge&logoColor=white)

</div>

---

## ✨ Visão geral

Demonstração de acionamento e comunicação entre interface web, Node.js e dispositivo serial, com atualizações via Socket.IO.

## 🚀 O que você encontra aqui

- **Comunicação bidirecional com Socket.IO**
- **Ponte entre comunicação serial e aplicação web**
- **Front-end Angular**
- **Back-end Express e TypeScript**

## 🧰 Tecnologias

`Angular`, `Node.js`, `TypeScript`, `Socket.IO`, `SerialPort`, `Arduino`.

## 🖼️ Visão técnica / demonstração

```mermaid
flowchart LR
 A[Angular] <-->|Socket.IO| B[Node.js]
 B <-->|SerialPort| C[Arduino]
```

## ▶️ Como explorar / executar

```bash
cd back-end
npm install
# Crie o .env contendo PORT=3000
npm run start-dev
```
Em outro terminal, acesse `front-end/socket-teste`, instale as dependências e execute `npm start` (confirme os scripts em `package.json`). Ajuste a porta serial usada no computador.

## 📁 Repositório

```bash
git clone https://github.com/KalleoLeandro/controle-lampadas-websocket.git
cd controle-lampadas-websocket
```

[Consultar os arquivos e o histórico do projeto](https://github.com/KalleoLeandro/controle-lampadas-websocket)

## 📝 Observações

> **Hardware:** a execução completa depende de dispositivo conectado e da porta serial correta.

---

<div align="center">

Desenvolvido e mantido por [Kalleo Leandro](https://github.com/KalleoLeandro).

⭐ Se este projeto for útil, considere deixar uma estrela.

</div>
