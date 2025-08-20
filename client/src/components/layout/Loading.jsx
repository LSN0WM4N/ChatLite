export const Loading = () => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full" />
        <span className="mt-4 text-white text-lg font-semibold">Loading...</span>
    </div>
);
