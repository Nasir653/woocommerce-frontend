
import React, { useState } from 'react';
import AtomAlert from '../atoms/Alert';

export default function ProductCard({ id, name, price, description, imageUrl, status, onDelete, onEdit, loading }) {
  const [error, setError] = useState('');

  const handleEdit = async () => {
    setError('');
    try {
      if (onEdit) await onEdit(id);
    } catch (err) {
      setError(err?.message || 'Failed to edit product');
    }
  };

  const handleDelete = async () => {
    setError('');
    try {
      if (onDelete) await onDelete(id);
    } catch (err) {
      setError(err?.message || 'Failed to delete product');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-3 w-full max-w-xs mx-auto border border-gray-100 hover:shadow-2xl transition-shadow duration-200">
      {imageUrl && <img src={imageUrl} alt={name} className="w-28 h-28 object-cover rounded-xl mb-2 shadow" />}
      <div className="font-bold text-xl text-blue-700 mb-1">{name}</div>
      <div className="text-gray-700 text-lg font-semibold">${price}</div>
      <div className="text-gray-500 text-sm text-center min-h-[40px]">{description}</div>
      <div className="text-xs text-gray-400 mt-2">Status: {status}</div>
      {error && <AtomAlert>{error}</AtomAlert>}
      <div className="flex gap-2 mt-3">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs disabled:opacity-60"
          onClick={handleEdit}
          disabled={loading}
        >{loading ? 'Loading...' : 'Edit'}</button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs disabled:opacity-60"
          onClick={handleDelete}
          disabled={loading}
        >{loading ? 'Loading...' : 'Delete'}</button>
      </div>
    </div>
  );
}
