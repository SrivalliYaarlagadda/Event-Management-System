"use client";

export default function DeleteModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[350px] p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-bold">Delete Event?</h2>
        <p className="mt-2 text-gray-600 text-sm">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded-md">
            Cancel
          </button>

          <button className="bg-red-600 px-4 py-2 text-white rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
