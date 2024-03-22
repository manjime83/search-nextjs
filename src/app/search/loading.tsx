export default function Loading() {
  return (
    <ul className="flex flex-col py-4 mt-10 bg-white divide-y shadow-md divide-zinc-100 rounded-b-md">
      {new Array(3).fill(null).map((_, i) => (
        <li key={i} className="flex w-full px-8 py-4 mx-auto mb-6 space-x-4 animate-pulse">
          <div className="relative flex items-center bg-gray-300 rounded-lg size-40"></div>
          <div className="flex-1 w-full py-1 space-y-2">
            <h1 className="w-2/5 h-4 bg-gray-300 rounded"></h1>
            <p className="w-4/5 h-4 bg-gray-300 rounded"></p>
            <p className="w-1/5 h-4 bg-gray-300 rounded"></p>
          </div>
        </li>
      ))}
    </ul>
  );
}
