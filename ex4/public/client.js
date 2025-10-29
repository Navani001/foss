const socket = io();
let username = '';

function subscribeUser() {
  username = document.getElementById('currentUser').value.trim();
  if (username) socket.emit('join', username);
}

function sendNotification() {
  const target = document.getElementById('targetUser').value.trim();
  const message = document.getElementById('notification').value.trim();
  if (!target || !message) return;
  fetch('/push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: target, from: username, content: message })
  });
}

socket.on('buzz', (data) => {
  const feed = document.getElementById('feed');
  const div = document.createElement('div');
  div.className = 'notification';
  const time = new Date().toLocaleTimeString();
  div.innerHTML = `<strong>${data.from}</strong>: ${data.content}<div style="font-size:12px;color:#888;">${time}</div>`;
  feed.prepend(div);
});
