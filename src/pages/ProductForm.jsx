import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getMyProducts } from '../api/api';
import ProductFormFields from '../components/molecules/ProductFormFields';
import AtomButton from '../components/atoms/Button';
import AtomAlert from '../components/atoms/Alert';
import { getCookie } from '../utils/cookie';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const token = getCookie('token');
        const { data } = await getMyProducts(token);
        const product = data.find((p) => String(p.id) === String(id));
        if (!product) throw new Error('Product not found');
        setName(product.name || '');
        setDescription(product.description || '');
        setPrice(product.price || '');
        setImagePreview(product.imageUrl || '');
      } catch (err) {
        setError('Failed to load product for editing');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // preview only
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = getCookie('token');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      if (imageFile) formData.append('image', imageFile);

      if (id) {
        await updateProduct(id, formData, token, true);
      } else {
        await createProduct(formData, token, true);
      }

      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold text-center mb-2 text-blue-700">
          {id ? 'Edit Product' : 'Create Product'}
        </h2>
        {error && <AtomAlert>{error}</AtomAlert>}
        <ProductFormFields
          name={name} setName={setName}
          description={description} setDescription={setDescription}
          price={price} setPrice={setPrice}
          imageUrl={imagePreview} setImageUrl={() => {}} // preview only
          isSubmitting={loading}
        />
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-contain border rounded" />
          )}
        </div>
        <div className="flex gap-2">
          <AtomButton type="submit" fullWidth disabled={loading}>
            {loading ? (id ? 'Updating...' : 'Creating...') : (id ? 'Update' : 'Create')}
          </AtomButton>
          <AtomButton type="button" color="secondary" onClick={() => navigate('/products')} fullWidth disabled={loading}>
            Cancel
          </AtomButton>
        </div>
      </form>
    </div>
  );
}
