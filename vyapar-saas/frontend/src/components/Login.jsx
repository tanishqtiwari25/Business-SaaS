import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser({ email, password });
      alert(`Login successful. Welcome, ${data.user.name} 🎉`);
      if (onAuthSuccess) onAuthSuccess(data.user);
    } catch (err) {
      setError(err.error || 'Login failed! Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back</h2>
        <p style={styles.subheading}>Please login in your Business account</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="example@vyapar.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Internal CSS styles for premium look
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    textAlign: 'center',
  },
  heading: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  subheading: {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    color: '#cbd5e1',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '6px',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'opacity 0.3s',
  },
  errorAlert: {
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid #ef4444',
    color: '#fca5a5',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '16px',
    textAlign: 'left',
  }
};

export default Login;