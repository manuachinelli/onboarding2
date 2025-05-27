'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './igor-chat.module.css'

export default function IgorChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [waiting, setWaiting] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { sender: 'user', text: input }]
    setMessages(newMessages)
    setInput('')
    setWaiting(true)

    try {
      const res = await fetch('https://manuachinelli.app.n8n.cloud/webhook/89bebd77-ed15-4cde-96a1-d04681f3bcd1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()
      setMessages([...newMessages, { sender: 'assistant', text: data.reply }])
    } catch {
      setMessages([...newMessages, { sender: 'assistant', text: 'Error al conectar con Igor.' }])
    } finally {
      setWaiting(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !waiting) sendMessage()
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userBubble : styles.assistantBubble}`}
          >
            {msg.text}
          </div>
        ))}
        {waiting && <div className={styles.waiting}>Igor está respondiendo...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            placeholder="Escribí tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={waiting}
          />
          <button
            onClick={sendMessage}
            className={`${styles.iconButton} ${waiting ? styles.disabled : ''}`}
            disabled={waiting}
          >
            ➤
          </button>
        </div>
        <div className={styles.status}>Say hi to Igor</div>
      </div>
    </div>
  )
}
