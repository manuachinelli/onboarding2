'use client'

import { useEffect, useState } from 'react'

export default function OnboardingPage() {
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      height: '100vh',
      backgroundColor: showLogo ? 'black' : 'white',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 1s ease',
    }}>
      {!showLogo ? (
        <svg width="200" height="200" viewBox="0 0 200 200">
          <g>
            <circle cx="100" cy="50" r="20" fill="black">
              <animate
                attributeName="r"
                from="20"
                to="0"
                dur="2s"
                begin="2s"
                fill="freeze"
              />
            </circle>
            <line x1="100" y1="70" x2="100" y2="130" stroke="black" strokeWidth="6">
              <animate
                attributeName="y2"
                from="130"
                to="200"
                dur="1s"
                begin="2.5s"
                fill="freeze"
              />
            </line>
            <line x1="100" y1="80" x2="70" y2="110" stroke="black" strokeWidth="6">
              <animate
                attributeName="x2"
                from="70"
                to="30"
                dur="1s"
                begin="2.5s"
                fill="freeze"
              />
            </line>
            <line x1="100" y1="80" x2="130" y2="110" stroke="black" strokeWidth="6">
              <animate
                attributeName="x2"
                from="130"
                to="170"
                dur="1s"
                begin="2.5s"
                fill="freeze"
              />
            </line>
          </g>
        </svg>
      ) : (
        <img
          src="/home.png"
          alt="Home"
          style={{
            width: '200px',
            filter: 'drop-shadow(0 0 20px white)',
            transition: 'opacity 1s ease-in',
            opacity: 1
          }}
        />
      )}
    </div>
  )
}
