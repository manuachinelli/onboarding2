'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [showLogo, setShowLogo] = useState(false)
  const [step, setStep] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
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
    const interval = setInterval(() => {
      if (step < messages.length - 1) {
        setStep((prev) => prev + 1)
      } else {
        clearInterval(interval)
        setTimeout(() => setShowLogo(true), 1500)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [step])

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
        <div key={step} style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'black',
          animation: ['fadeIn', 'slideLeft', 'slideRight', 'zoomIn', 'slideUp', 'fadeIn'][step % 6] + ' 0.6s ease forwards'
        }}>
          {messages[step]}
        </div>
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
          <h1 style={{
            color: 'white',
            fontWeight: 400,
            fontSize: '24px',
            marginBottom: '40px'
          }}>
            Bienvenido a Igor
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideLeft {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideRight {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
