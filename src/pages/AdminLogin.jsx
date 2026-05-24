import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, { username, password });
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center px-4 pt-20">
      <div className="glass w-full max-w-md p-10">
        {/* Icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue mb-4">
            <Lock size={26} />
          </div>
          <h2 className="text-2xl font-bold font-heading">Admin Login</h2>
          <p className="text-text-gray text-sm mt-1">Sign in to access the dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg p-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-text-gray text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/admin/register" className="text-accent-blue hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
