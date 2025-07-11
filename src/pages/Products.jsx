
import { useEffect, useState } from 'react';
import { getMyProducts, deleteProduct } from '../api/api';
import { useNavigate } from 'react-router-dom';
import AtomButton from '../components/atoms/Button';
import AtomAlert from '../components/atoms/Alert';
import ProductList from '../components/organisms/ProductList';
import { getCookie } from '../utils/cookie';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loadingId, setLoadingId] = useState(null); // for delete/edit loader
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getCookie('token');
        const { data } = await getMyProducts(token);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    setError('');
    setLoadingId(id);
    try {
      const token = getCookie('token');
      await deleteProduct(id, token);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      throw new Error(err?.response?.data?.message || 'Failed to delete product');
    } finally {
      setLoadingId(null);
    }
  };

  // Handle edit (navigate to edit page, e.g. /edit/:id)
  const handleEdit = async (id) => {
    setError('');
    setLoadingId(id);
    try {
      navigate(`/edit/${id}`);
    } catch (err) {
      throw new Error('Failed to navigate to edit page');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">My Products</h2>
        <AtomButton onClick={() => navigate('/create')}>Create Product</AtomButton>
      </div>
      {error && <AtomAlert>{error}</AtomAlert>}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <ProductList products={products} onDelete={handleDelete} onEdit={handleEdit} loadingId={loadingId} />
      </div>
    </div>
  );
}
