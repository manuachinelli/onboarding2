'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [showLogo, setShowLogo] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogoClick = () => {
    setShowForm(true)
  }

  const validateUrl = (input) => {
    try {
      const parsed = new URL(input)
      return ['http:', 'https:'].includes(parsed.protocol)
    } catch {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateUrl(url)) {
      setError('Por favor ingresa una URL válida (ej: https://tusitio.com)')
      return
    }

    try {
      await fetch('https://manuachinelli.app.n8n.cloud/webhook/2c497b66-0d5e-4f22-8d84-15568eba0d93', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: url }),
      })
      router.push('/onboarding/igor-chat')
    } catch (err) {
      setError('Hubo un problema al enviar. Intentá de nuevo.')
    }
  }

  const iconNames = ['automation.png', 'billing.png', 'chat.png', 'flows.png']

  return (
    <div style={{
      height: '100vh',
      backgroundColor: showLogo ? 'black' : 'white',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif',
      transition: 'background-color 1s ease',
      overflow: 'hidden'
    }}>
      {!showLogo ? (
        <svg width="200" height="200" viewBox="0 0 200 200">
          <g>
            <circle cx="100" cy="50" r="20" fill="black">
              <animate attributeName="r" from="20" to="0" dur="2s" begin="2s" fill="freeze" />
            </circle>
            <line x1="100" y1="70" x2="100" y2="130" stroke="black" strokeWidth="6">
              <animate attributeName="y2" from="130" to="200" dur="1s" begin="2.5s" fill="freeze" />
            </line>
            <line x1="100" y1="80" x2="70" y2="110" stroke="black" strokeWidth="6">
              <animate attributeName="x2" from="70" to="30" dur="1s" begin="2.5s" fill="freeze" />
            </line>
            <line x1="100" y1="80" x2="130" y2="110" stroke="black" strokeWidth="6">
              <animate attributeName="x2" from="130" to="170" dur="1s" begin="2.5s" fill="freeze" />
            </line>
          </g>
        </svg>
      ) : showForm ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <label style={{ fontSize: '18px' }}>¿Puedes comentarme cuál es la web de tu negocio?</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://tusitio.com"
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              border: 'none',
              width: '320px',
              fontSize: '14px',
              backgroundColor: '#1a1a1a',
              color: 'white'
            }}
            required
          />
          {error && <div style={{ color: '#f87171', fontSize: '12px' }}>{error}</div>}
          <button
            type="submit"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Continuar
          </button>
        </form>
      ) : (
        <>
          <img
            src="/home.png"
            alt="Home"
            onClick={handleLogoClick}
            style={{
              width: '160px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 0 15px white)',
              cursor: 'pointer'
            }}
          />

          <h1 style={{
            color: 'white',
            fontWeight: 400,
            fontSize: '24px',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            BIENVENIDO A IGOR<br />
            TU PRIMER AGENTE PERSONAL<br />
            SERA TU MEJOR AMIGO PARA SIEMPRE<br />
            HARA LAS TAREAS REPETITIVAS DE TU TRABAJO<br />
            Y VOS TE ENCARGARAS DE LO DEMAS<br />
            HACIENDO FOCO EN LO QUE REALMENTE TE DA VALOR
          </h1>

          <div style={{
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {iconNames.map((name, index) => (
              <img
                key={name}
                src={`/${name}`}
                alt={name}
                style={{
                  width: '64px',
                  filter: 'drop-shadow(0 0 12px white)',
                  transform: 'translateY(-150px)',
                  opacity: 0,
                  animation: `drop 0.6s ease-out forwards`,
                  animationDelay: `${0.6 + index * 0.2}s`
                }}
              />
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes drop {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
