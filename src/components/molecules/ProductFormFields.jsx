import AtomInput from '../atoms/Input';

export default function ProductFormFields({ name, setName, description, setDescription, price, setPrice, imageUrl, setImageUrl, isSubmitting }) {
  return (
    <>
      <AtomInput label="Name" value={name} onChange={e => setName(e.target.value)} required />
      <AtomInput label="Description" value={description} onChange={e => setDescription(e.target.value)} required multiline rows={3} />
      <AtomInput label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
      <AtomInput label="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
    </>
  );
}
