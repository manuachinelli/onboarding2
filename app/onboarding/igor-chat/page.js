'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './IgorChat.module.css'

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

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: 'user', text: input }])
    setInput('')
    // Simulación de respuesta
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'assistant', text: 'Respuesta automática de Igor.' }])
    }, 1000)
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
        {isConverting && <div className={styles.waiting}>Convirtiendo audio a texto...</div>}
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
          />

          {!isRecording && !isConverting && (
            <button className={styles.iconButton} onClick={() => setIsRecording(true)}>
              <MicSVG />
            </button>
          )}
        </div>

        {isRecording && (
          <>
            <div className={styles.recordingWave}>
              {[...Array(5)].map((_, i) => <div key={i} className={styles.bar} />)}
            </div>
            <div className={styles.confirmButtons}>
              <button className={styles.confirmButton} onClick={() => {
                setIsRecording(false)
                setIsConverting(true)
                setTimeout(() => {
                  setInput('Texto convertido desde voz')
                  setIsConverting(false)
                }, 2000)
              }}>✅</button>
              <button className={styles.confirmButton} onClick={() => setIsRecording(false)}>❌</button>
            </div>
          </>
        )}

        <div className={styles.status}>Estás hablando con Igor v1.0.0</div>
      </div>
    </div>
  )
}
