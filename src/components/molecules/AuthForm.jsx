import AtomButton from '../atoms/Button';
import AtomAlert from '../atoms/Alert';

export default function AuthForm({ title, fields, onSubmit, error, buttonText, footer }) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-2 text-blue-700">{title}</h2>
      {error && <AtomAlert>{error}</AtomAlert>}
      {fields}
      <AtomButton type="submit" fullWidth>{buttonText}</AtomButton>
      {footer}
    </form>
  );
}
