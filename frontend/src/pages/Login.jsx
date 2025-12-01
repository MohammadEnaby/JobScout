import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, initiateGoogleSignIn, resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [googleHover, setGoogleHover] = useState(false);
  const [submitHover, setSubmitHover] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [hoveredInput, setHoveredInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = async (data) => {
    try {
      setError('');
      setLoading(true);
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError('Failed to log in. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await initiateGoogleSignIn();
      if (result.isNewUser) {
        navigate('/complete-profile');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setError('Please enter your email address.');
      return;
    }
    try {
      setError('');
      setLoading(true);
      await resetPassword(resetEmail);
      setResetSuccess(true);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (fieldName) => {
    const isHovered = hoveredInput === fieldName;
    const isFocused = focusedField === fieldName;
    return {
      width: '100%',
      padding: '12px 16px',
      background: isFocused 
        ? 'rgba(6, 182, 212, 0.08)' 
        : isHovered 
          ? 'rgba(6, 182, 212, 0.04)' 
          : 'rgba(15, 23, 42, 0.6)',
      border: `2px solid ${isFocused ? '#06b6d4' : isHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(148, 163, 184, 0.2)'}`,
      borderRadius: '12px',
      fontSize: '14px',
      color: '#f1f5f9',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: isFocused 
        ? '0 0 25px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.05)' 
        : isHovered 
          ? '0 0 15px rgba(6, 182, 212, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2)' 
          : 'none',
      transform: isFocused ? 'scale(1.02) translateY(-2px)' : isHovered ? 'scale(1.01) translateY(-1px)' : 'scale(1)',
      caretColor: '#06b6d4',
      cursor: 'text'
    };
  };

  if (showForgotPassword) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        padding: '15px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        
        <div style={{
          maxWidth: '400px',
          width: '100%',
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          padding: '30px',
          borderRadius: '20px',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1,
          animation: 'slideUp 0.6s ease-out'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px', animation: 'bounce 2s infinite' }}>🔐</div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#f1f5f9', marginBottom: '6px' }}>Reset Password</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Enter your email to receive a reset link</p>
          </div>

          {resetSuccess ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '20px', textAlign: 'center', animation: 'scaleIn 0.4s ease-out' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px', animation: 'bounce 1s' }}>✅</div>
              <p style={{ color: '#10b981', marginBottom: '14px' }}>Reset email sent!</p>
              <button onClick={() => setShowForgotPassword(false)} style={{ background: 'transparent', color: '#06b6d4', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>← Back to Login</button>
            </div>
          ) : (
            <>
              {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '12px', animation: 'shake 0.5s' }}>{error}</div>}
              <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="Enter your email" style={inputStyle('resetEmail')} onFocus={() => setFocusedField('resetEmail')} onBlur={() => setFocusedField(null)} />
              <button onClick={handleForgotPassword} disabled={loading} style={{ width: '100%', padding: '12px', marginTop: '16px', background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
              <button onClick={() => { setShowForgotPassword(false); setError(''); }} style={{ width: '100%', padding: '12px', marginTop: '10px', background: 'transparent', color: '#94a3b8', border: '2px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>← Back to Login</button>
            </>
          )}
        </div>
        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
          @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '15px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float1 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float2 10s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float3 6s ease-in-out infinite',
        transform: 'translate(-50%, -50%)'
      }} />

      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: 'rgba(30, 41, 59, 0.85)',
        backdropFilter: 'blur(20px)',
        padding: '28px 32px',
        borderRadius: '24px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 1,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        
        {/* Navigation to Signup - Creative animated button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Link 
            to="/signup"
            onMouseEnter={() => setNavHover(true)}
            onMouseLeave={() => setNavHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: navHover ? 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)' : 'rgba(6, 182, 212, 0.1)',
              border: `2px solid ${navHover ? 'transparent' : 'rgba(6, 182, 212, 0.3)'}`,
              borderRadius: '30px',
              color: navHover ? 'white' : '#06b6d4',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '700',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: navHover ? 'scale(1.08) translateX(5px)' : 'scale(1)',
              boxShadow: navHover ? '0 10px 30px rgba(6, 182, 212, 0.4)' : 'none'
            }}
          >
            <span style={{ 
              fontSize: '16px',
              transition: 'transform 0.3s ease',
              transform: navHover ? 'rotate(20deg) scale(1.2)' : 'rotate(0)'
            }}>✨</span>
            <span>Create Account</span>
            <span style={{ 
              transition: 'transform 0.3s ease',
              transform: navHover ? 'translateX(5px)' : 'translateX(0)'
            }}>→</span>
          </Link>
        </div>

        {/* Logo with pulse animation */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div 
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            style={{
              width: '65px',
              height: '65px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              fontSize: '28px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: logoHover ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
              boxShadow: logoHover 
                ? '0 15px 40px rgba(6, 182, 212, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)' 
                : '0 10px 30px rgba(6, 182, 212, 0.3)',
              animation: 'pulse 3s ease-in-out infinite'
            }}>
            JS
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #06b6d4 50%, #8b5cf6 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '6px',
            animation: 'gradient 4s ease infinite'
          }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Sign in to continue to JobScout
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '10px 14px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'shake 0.5s ease-out'
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Google Sign In with hover effects */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          onMouseEnter={() => setGoogleHover(true)}
          onMouseLeave={() => setGoogleHover(false)}
          type="button"
          style={{
            width: '100%',
            padding: '12px',
            background: googleHover ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
            border: `2px solid ${googleHover ? 'rgba(6, 182, 212, 0.5)' : 'rgba(148, 163, 184, 0.2)'}`,
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#e2e8f0',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: googleHover ? 'scale(1.02) translateY(-2px)' : 'scale(1)',
            boxShadow: googleHover ? '0 10px 30px rgba(0, 0, 0, 0.3)' : 'none'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" style={{ transition: 'transform 0.3s', transform: googleHover ? 'rotate(360deg)' : 'rotate(0)' }}>
            <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
            <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
            <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
            <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
          </svg>
          Continue with Google
        </button>

        {/* Animated Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '18px 0', gap: '14px' }}>
          <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)', animation: 'shimmer 2s infinite' }} />
          <span style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', padding: '4px 10px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '20px' }}>or</span>
          <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)', animation: 'shimmer 2s infinite reverse' }} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: focusedField === 'email' ? '#06b6d4' : '#94a3b8',
              marginBottom: '6px',
              transition: 'all 0.3s ease',
              transform: focusedField === 'email' ? 'translateX(5px)' : 'translateX(0)'
            }}>
              ✉️ Email Address
            </label>
            <input
              {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" } })}
              type="email"
              placeholder="you@example.com"
              style={inputStyle('email')}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              onMouseEnter={() => setHoveredInput('email')}
              onMouseLeave={() => setHoveredInput(null)}
            />
            {errors.email && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '5px', animation: 'fadeIn 0.3s' }}>{errors.email.message}</p>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: focusedField === 'password' ? '#06b6d4' : '#94a3b8',
              marginBottom: '6px',
              transition: 'all 0.3s ease',
              transform: focusedField === 'password' ? 'translateX(5px)' : 'translateX(0)'
            }}>
              🔒 Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                style={{ ...inputStyle('password'), paddingRight: '45px' }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                onMouseEnter={() => setHoveredInput('password')}
                onMouseLeave={() => setHoveredInput(null)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: showPassword ? '#06b6d4' : '#64748b',
                  transition: 'all 0.3s ease',
                  borderRadius: '6px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#06b6d4'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = showPassword ? '#06b6d4' : '#64748b'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '5px', animation: 'fadeIn 0.3s' }}>{errors.password.message}</p>}
          </div>

          <div style={{ textAlign: 'right', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#06b6d4',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: '4px 8px',
                borderRadius: '6px'
              }}
              onMouseEnter={(e) => { e.target.style.background = 'rgba(6, 182, 212, 0.1)'; e.target.style.color = '#8b5cf6'; }}
              onMouseLeave={(e) => { e.target.style.background = 'none'; e.target.style.color = '#06b6d4'; }}
            >
              Forgot password? 🔑
            </button>
          </div>

          {/* Animated Submit Button */}
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#475569' : 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
              backgroundSize: '200% 200%',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: submitHover && !loading ? 'scale(1.03) translateY(-3px)' : 'scale(1)',
              boxShadow: submitHover && !loading 
                ? '0 20px 40px rgba(6, 182, 212, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)' 
                : '0 10px 30px rgba(6, 182, 212, 0.3)',
              animation: !loading ? 'gradient 3s ease infinite' : 'none',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <span style={{ transition: 'transform 0.3s', transform: submitHover ? 'translateX(5px)' : 'translateX(0)' }}>→</span>}
            </span>
          </button>
        </form>
      </div>

      <style>{`
        @keyframes float1 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(30px, -30px) rotate(5deg); } 66% { transform: translate(-20px, 20px) rotate(-5deg); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(-40px, 30px) rotate(-5deg); } 66% { transform: translate(30px, -40px) rotate(5deg); } }
        @keyframes float3 { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.2); } }
        @keyframes pulse { 0%, 100% { box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3); } 50% { box-shadow: 0 10px 40px rgba(6, 182, 212, 0.5), 0 0 60px rgba(139, 92, 246, 0.2); } }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
        @keyframes shimmer { 0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
