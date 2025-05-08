export async function sendChatMessage(history) {
  const res = await fetch('http://localhost:4000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history }),
  });
  const data = await res.json();
  return data.content;
}
