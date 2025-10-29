const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const pub = createClient();
const sub = createClient();
app.use(express.static('public'));
app.use(express.json());
(async () => {
  await pub.connect();
  await sub.connect();
  console.log('Redis connected.');
  await sub.subscribe('social_channel', (msg) => {
    const data = JSON.parse(msg);
    io.to(data.to).emit('buzz', data);
  });
})();

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join', (username) => {
    socket.join(username);
    console.log(`User ${username} joined their notification room.`);
  });
});
app.post('/push', async (req, res) => {
  const { to, from, content } = req.body;
  await pub.publish('social_channel', JSON.stringify({ to, from, content }));
  res.send({ success: true });
});
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
