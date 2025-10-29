const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join', (username) => {
    socket.join(username);
    console.log(`User ${username} joined their notification room.`);
  });
//   socket.on('disconnect', () => {
//     console.log('Socket disconnected:', socket.id);
//   });
});

app.post('/push', (req, res) => {
  const { to, from, content } = req.body;
  io.to(to).emit('buzz', { to, from, content });
  res.send({ success: true });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
