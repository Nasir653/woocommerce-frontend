
import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/api';
import AuthForm from '../components/molecules/AuthForm';
import AtomInput from '../components/atoms/Input';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <AuthForm
          title="Register"
          error={error}
          buttonText="Register"
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
          footer={<p className="text-center">Already have an account? <Link className="text-blue-600 hover:underline" to={"/login"}>Login</Link></p>}
        />
      </div>
    </div>
  );
}
