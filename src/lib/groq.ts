export async function sendMessage(messages: any[], model: string = 'llama-3.3-70b-versatile') {
  const response = await fetch('/.netlify/functions/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model }),
  });

  if (!response.ok) throw new Error('Failed to send message');
  return response.json();
}

export async function checkHealth() {
  try {
    const res = await fetch('/.netlify/functions/chat', { method: 'OPTIONS' });
    return res.ok;
  } catch {
    return false;
  }
}
