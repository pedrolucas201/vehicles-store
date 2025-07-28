// src/components/ImageUpload.jsx
import { useState } from "react";

export default function ImageUpload({ onFiles }) {
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
    if (onFiles) onFiles(files);
  };

  return (
    <div className="space-y-2">
      <label className="block text-neutral-300 font-medium">
        Selecione novas fotos
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="block w-full text-sm bg-neutral-700 text-white p-2 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-500 file:text-white hover:file:bg-brand-600"
      />
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {previews.map((src, i) => (
            <div key={i} className="w-24 h-24 border rounded overflow-hidden">
              <img src={src} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
