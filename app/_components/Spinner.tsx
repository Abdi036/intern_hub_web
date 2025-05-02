export default function Spinner({ text }: { text?: string }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      {text && <p className="text-center font-semibold">{text}</p>}
    </div>
  );
}
