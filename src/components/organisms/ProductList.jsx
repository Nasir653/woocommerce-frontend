import ProductCard from '../molecules/ProductCard';

export default function ProductList({ products, onDelete, onEdit, loadingId }) {
  if (!products.length) {
    return <div className="text-center text-gray-500 py-12 text-lg">No products found.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} onDelete={onDelete} onEdit={onEdit} loading={loadingId === p.id} />
      ))}
    </div>
  );
}
