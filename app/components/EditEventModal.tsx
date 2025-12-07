"use client";

import { useState } from "react";

export default function EditEventModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[400px] rounded-lg shadow-xl space-y-4">
        <h2 className="text-lg font-bold">Edit Event</h2>

        <input
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Event Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Description"
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded-md">
            Cancel
          </button>
          <button className="bg-blue-600 px-4 py-2 text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
