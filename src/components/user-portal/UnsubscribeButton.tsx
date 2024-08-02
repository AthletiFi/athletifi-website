import { useFormStatus } from 'react-dom';

export default function UnsubscribeButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`h-8 w-40 py-3 px-6 text-sm leading-6 flex items-center justify-center rounded text-white ${pending ? 'bg-gray-500' : 'bg-chartRed'}`}
    >
      {pending ? 'Unsubscribing...' : 'Unsubscribe'}
    </button>
  );
}
