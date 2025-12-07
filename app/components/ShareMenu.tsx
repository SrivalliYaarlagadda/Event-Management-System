"use client";

export default function ShareMenu({ onClose }: { onClose: () => void }) {
  const copy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[300px] p-6 rounded-lg shadow space-y-3">
        <h2 className="font-semibold text-lg">Share Event</h2>

        <button
          onClick={copy}
          className="w-full bg-gray-200 py-2 rounded-md text-sm"
        >
          Copy Link
        </button>

        <button
          onClick={onClose}
          className="w-full text-sm underline text-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
