
import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import AuthForm from '../components/molecules/AuthForm';
import AtomInput from '../components/atoms/Input';
import { setCookie } from '../utils/cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      setCookie('token', data.token, 7);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <AuthForm
          title="Login"
          error={error}
          buttonText="Login"
          onSubmit={handleSubmit}
          fields={[
            <AtomInput
              key="email"
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />, 
            <AtomInput
              key="password"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          ]}
          footer={<p className="text-center">Don't have an account? <Link to={"/register"} className="text-blue-600 hover:underline" >Register</Link></p>}
        />
      </div>
    </div>
  );
}
