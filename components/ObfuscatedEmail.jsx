'use client'
export default function ObfuscatedEmail({ className, style }) {
  const email = ['post', 'deriskmatrix.com'].join('@')
  return (
    <a href={`mailto:${email}`} className={className} style={style}>
      {email}
    </a>
  )
}
