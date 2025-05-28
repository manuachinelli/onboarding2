'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './igor-chat.module.css'

export default function IgorChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [recognizing, setRecognizing] = useState(false)
  const [processingVoice, setProcessingVoice] = useState(false)

  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)

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
        body: JSON.stringify({
          message: input,
          userId: 'igor-demo-user-1'
        }),
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

  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return alert('Tu navegador no soporta reconocimiento de voz.')

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.lang = 'es-AR'
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setProcessingVoice(true)
        setTimeout(() => {
          setInput((prev) => prev + transcript)
          setProcessingVoice(false)
        }, 1000)
      }

      recognitionRef.current.onerror = () => {
        setRecognizing(false)
        setProcessingVoice(false)
      }

      recognitionRef.current.onend = () => {
        setRecognizing(false)
      }
    }

    if (!recognizing) {
      setRecognizing(true)
      recognitionRef.current.start()
    } else {
      recognitionRef.current.stop()
    }
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
            placeholder="Escribí tu mensaje o hablá..."
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
          <button
            onClick={toggleVoiceInput}
            className={styles.micButton}
            disabled={recognizing || processingVoice}
            title="Hablar"
          >
            {processingVoice ? (
              <span className={styles.spinner} />
            ) : (
              <span className={styles.micIcon}>🎤</span>
            )}
          </button>
        </div>
        <div className={styles.status}>Say hi to Igor</div>
      </div>
    </div>
  )
}

