'use client'

import { useState } from 'react'

export default function IgorChat() {
  const [msg, setMsg] = useState('')

  return (
    <div style={{ color: 'white', backgroundColor: 'black', height: '100vh', padding: 20 }}>
      <h1>Chat de prueba</h1>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Escribí algo"
        style={{ padding: 10, width: 200 }}
      />
    </div>
  )
}
