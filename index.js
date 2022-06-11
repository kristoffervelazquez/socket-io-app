import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {Server} from 'socket.io';
import http from 'http'

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});


server.listen(4000, () => {
    console.log('Listening on port 4000 http://localhost:4000');
})