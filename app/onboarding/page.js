'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [showLogo, setShowLogo] = useState(false)
  const [step, setStep] = useState(0)
  const router = useRouter()

  const messages = [
    'BIENVENIDO A IGOR',
    'TU PRIMER AGENTE PERSONAL',
    'SERA TU MEJOR AMIGO PARA SIEMPRE',
    'HARA LAS TAREAS REPETITIVAS DE TU TRABAJO',
    'Y VOS TE ENCARGARAS DE LO DEMAS',
    'HACIENDO FOCO EN LO QUE REALMENTE TE DA VALOR',
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showLogo) return
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < messages.length - 1) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [showLogo])

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
      ) : (
        <>
          <img
            src="/home.png"
            alt="Home"
            onClick={() => router.push('/onboarding/igor-chat')}
            style={{
              width: '160px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 0 15px white)',
              cursor: 'pointer'
            }}
          />
          <div style={{
            color: 'white',
            fontWeight: 400,
            fontSize: '24px',
            marginBottom: '40px',
            textAlign: 'center',
            minHeight: '40px',
            transition: 'opacity 0.3s ease',
            animation: 'fadeIn 0.6s ease',
          }}>
            {messages[step]}
          </div>

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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
