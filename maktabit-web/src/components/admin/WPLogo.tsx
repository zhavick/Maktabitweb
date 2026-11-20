import React from 'react'

export function WPLogo() {
  return (
    <div className="wp-maktab-login-logo">
      <div className="wp-maktab-login-logo__badge">
        <svg viewBox="0 0 72 72" width="46" height="46" fill="none">
          <path
            d="M24 8H48L64 24V48L48 64H24L8 48V24L24 8Z"
            stroke="#2271b1"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 46V26L36 37L52 26V46"
            stroke="#1d2327"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="36" cy="20" r="4" fill="#2271b1" />
        </svg>
      </div>
      <div className="wp-maktab-login-logo__text">
        <span className="wp-maktab-login-logo__main">
          Maktab<span style={{ color: '#2271b1' }}>IT</span> CMS
        </span>
        <span className="wp-maktab-login-logo__sub">WordPress-Style Publishing Dashboard</span>
      </div>
    </div>
  )
}

export function WPIcon() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: '#2271b1',
        color: '#ffffff',
        fontWeight: 800,
        fontSize: '14px',
        fontFamily: 'sans-serif',
      }}
    >
      M
    </div>
  )
}
