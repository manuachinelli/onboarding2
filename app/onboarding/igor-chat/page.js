const sendToN8N = async (text) => {
  if (!text.trim()) return
  setWaiting(true)
  const newMessages = [...messages, { sender: 'user', text }]
  setMessages(newMessages)

  const userId = localStorage.getItem('igor_user_id') || 'undefined'

  try {
    const res = await fetch('https://manuachinelli.app.n8n.cloud/webhook/89bebd77-ed15-4cde-96a1-d04681f3bcd1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, userId }),
    })
    const data = await res.json()
    setMessages([...newMessages, { sender: 'assistant', text: data.output || data.reply || '...' }])
  } catch {
    setMessages([...newMessages, { sender: 'assistant', text: 'Error al conectar con Igor.' }])
  } finally {
    setWaiting(false)
  }
}
