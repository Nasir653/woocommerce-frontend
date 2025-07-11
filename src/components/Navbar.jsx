import { useNavigate } from 'react-router-dom';
import AtomButton from './atoms/Button';
import { getCookie, deleteCookie } from '../utils/cookie';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = !!getCookie('token');
  const handleLogout = () => {
    deleteCookie('token');
    navigate('/login');
  };
  return (
    <nav className="flex gap-2 items-center bg-white shadow-lg p-4 mb-6 rounded-lg border-b border-gray-200">
      <span className="text-xl font-bold text-blue-600 mr-auto cursor-pointer" onClick={() => navigate(isAuth ? '/products' : '/login')}>DPLY</span>
      {isAuth && (
        <>
          <AtomButton onClick={() => navigate('/products')}>Products</AtomButton>
          <AtomButton onClick={() => navigate('/create')}>Create Product</AtomButton>
          <AtomButton color="secondary" onClick={handleLogout}>Logout</AtomButton>
        </>
      )}
    </nav>
  );
}
