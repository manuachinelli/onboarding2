'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './igor-chat.module.css'

const MicSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="white">
    <path d="M12 14c1.65 0 3-1.35 3-3V5a3 3 0 0 0-6 0v6c0 1.65 1.35 3 3 3zM17.3 11c0 3-2.4 5.3-5.3 5.3s-5.3-2.3-5.3-5.3H5c0 3.7 2.8 6.7 6.3 7.2V21h1.5v-2.8c3.5-.5 6.2-3.5 6.2-7.2h-1.7z" />
  </svg>
)

export default function IgorChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [waiting, setWaiting] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getUserId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('igor-user-id') || 'igor-demo-user-1'
    }
    return 'igor-demo-user-1'
  }

  const sendToN8N = async (text) => {
    if (!text.trim()) return
    setWaiting(true)
    const newMessages = [...messages, { sender: 'user', text }]
    setMessages(newMessages)

    try {
      const res = await fetch('https://manuachinelli.app.n8n.cloud/webhook/89bebd77-ed15-4cde-96a1-d04681f3bcd1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userId: getUserId()
        }),
      })
      const data = await res.json()
      setMessages([...newMessages, { sender: 'assistant', text: data.output || data.reply || '...' }])
    } catch {
      setMessages([...newMessages, { sender: 'assistant', text: 'Error al conectar con Igor.' }])
    } finally {
      setWaiting(false)
    }
  }

  const handleSend = () => {
    if (!input.trim()) return
    sendToN8N(input)
    setInput('')
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
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
            type="text"
            className={styles.input}
            placeholder="Escribí tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={waiting}
          />

          {!isRecording && !isConverting && (
            <>
              <button
                className={`${styles.iconButton} ${waiting ? styles.disabled : ''}`}
                onClick={handleSend}
                disabled={waiting}
              >
                ➤
              </button>
              <button
                className={`${styles.iconButton} ${waiting ? styles.disabled : ''}`}
                onClick={() => setIsRecording(true)}
              >
                <MicSVG />
              </button>
            </>
          )}
        </div>

        {isRecording && (
          <>
            <div className={styles.recordingWave}>
              {[...Array(5)].map((_, i) => <div key={i} className={styles.bar} />)}
            </div>
            <div className={styles.confirmButtons}>
              <button
                className={styles.confirmButton}
                onClick={() => {
                  setIsRecording(false)
                  setIsConverting(true)
                  setTimeout(() => {
                    const converted = input || '...'
                    setIsConverting(false)
                    sendToN8N(converted)
                  }, 1500)
                }}
              >
                ✅
              </button>
              <button
                className={styles.confirmButton}
                onClick={() => setIsRecording(false)}
              >
                ❌
              </button>
            </div>
          </>
        )}

        <div className={styles.status}>Estás hablando con Igor v1.0.0</div>
      </div>
    </div>
  )
}
