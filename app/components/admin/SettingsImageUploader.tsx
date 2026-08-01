"use client";

import { useRef, useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export default function SettingsImageUploader({
  label,
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function uploadImage(
    file: File
  ) {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onChange(data.url);
      } else {
        alert(data.message || "Upload failed");
      }

    } catch (error) {

      console.error(error);

      alert("Image upload failed.");

    } finally {

      setUploading(false);

    }
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    uploadImage(file);
  }

  function removeImage() {
    onChange("");
  }

  return (
    <div className="space-y-4">

      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      >
      </input>
            {value ? (

        <div className="overflow-hidden rounded-xl border bg-gray-50">

          <img
            src={value}
            alt={label}
            className="h-56 w-full object-cover"
          />

        </div>

      ) : (

        <div
          onClick={() => inputRef.current?.click()}
          className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-green-600 hover:bg-green-50"
        >

          <div className="mb-3 text-5xl">
            📷
          </div>

          <p className="font-semibold text-gray-700">
            Click to Upload
          </p>

          <p className="mt-1 text-sm text-gray-500">
            JPG, PNG, WEBP
          </p>

        </div>

      )}

      <div className="flex flex-wrap gap-3">

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-green-700 px-5 py-2 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : value ? "Change Image" : "Upload Image"}
        </button>

        {value && (

          <button
            type="button"
            onClick={removeImage}
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Remove Image
          </button>

        )}

      </div>

      {value && (

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-600">
            Image URL
          </label>

          <input
            type="text"
            readOnly
            value={value}
            className="w-full rounded-lg border bg-gray-100 p-3 text-sm text-gray-600"
          />

        </div>

      )}

    </div>
  );
}