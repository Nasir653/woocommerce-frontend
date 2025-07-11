import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Products from './src/pages/Products';
import ProductForm from './src/pages/ProductForm';
import Navbar from './src/components/Navbar';
import ProtectedRoute from './src/middleware/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
