export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, backgroundColor: 'black', color: 'white' }}>
        {children}
      </body>
    </html>
  )
}