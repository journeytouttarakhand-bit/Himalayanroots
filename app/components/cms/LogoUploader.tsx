"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface LogoUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function LogoUploader({
  value,
  onChange,
}: LogoUploaderProps) {
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

      const res = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        onChange(data.url);
      } else {
        alert(
          data.message ||
            "Upload failed."
        );
      }
    } catch (error) {
      console.error(error);

      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-bold text-green-800">
        Website Logo
      </h2>

      <div className="flex flex-col items-center gap-5">

        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl border bg-gray-50">

          {value ? (
            <Image
              src={value}
              alt="Logo"
              width={160}
              height={160}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-sm text-gray-400">
              No Logo
            </span>
          )}

        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (file) {
              uploadImage(file);
            }
          }}
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            inputRef.current?.click()
          }
          className={`rounded-xl px-6 py-3 font-semibold text-white transition ${
            uploading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-green-700 hover:bg-green-800"
          }`}
        >
          {uploading
            ? "Uploading..."
            : "Upload Logo"}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-medium text-red-600 hover:text-red-700"
          >
            Remove Logo
          </button>
        )}

      </div>

    </div>
  );
}