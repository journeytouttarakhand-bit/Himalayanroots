"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  multiple?: boolean;
  value?: string;
  onChange: (url: string) => void;
};

type PreviewImage = {
  id: string;
  file: File;
  preview: string;
};

export default function ImageUploader({
  multiple = false,
  value = "",
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<PreviewImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  function handleFiles(selected: FileList | null) {
    if (!selected) return;

    const list: PreviewImage[] = Array.from(selected).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    if (multiple) {
      setFiles((prev) => [...prev, ...list]);
    } else {
      setFiles(list.slice(0, 1));
    }
  }

  function removeImage(id: string) {
    setFiles((prev) => {
      const image = prev.find((i) => i.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return prev.filter((i) => i.id !== id);
    });
  }

  async function uploadImages() {
    if (!files.length) {
      alert("Please select image.");
      return;
    }

    setUploading(true);

    try {
      let firstImage = "";

      for (const image of files) {
        const formData = new FormData();

        formData.append("file", image.file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error("Upload failed");
        }

        if (!firstImage) {
          firstImage = data.imageUrl;
        }
      }

      onChange(firstImage);

      alert("Images Uploaded Successfully");
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-5">

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          dragging
            ? "border-green-700 bg-green-50"
            : "border-gray-300"
        }`}
      >
        <input
          ref={inputRef}
          hidden
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <p className="text-lg font-bold">
          Click or Drag Images Here
        </p>

        <p className="text-gray-500 mt-2">
          JPG • PNG • WEBP
        </p>
      </div>

      {value && files.length === 0 && (
        <div className="w-52">
          <Image
            src={value}
            alt="Current"
            width={250}
            height={250}
            className="rounded-xl border"
          />
        </div>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((image) => (
            <div
              key={image.id}
              className="relative border rounded-xl overflow-hidden"
            >
              <Image
                src={image.preview}
                alt=""
                width={250}
                height={250}
                className="w-full h-40 object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
            <button
        type="button"
        onClick={uploadImages}
        disabled={uploading || files.length === 0}
        className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
      >
        {uploading
          ? "Uploading Images..."
          : "Upload Images"}
      </button>

      {files.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-700 mb-2">
            Selected Images
          </h3>

          <ul className="space-y-2">
            {files.map((image, index) => (
              <li
                key={image.id}
                className="flex justify-between items-center text-sm"
              >
                <span className="truncate">
                  {index + 1}. {image.file.name}
                </span>

                <span className="text-gray-500">
                  {(image.file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </li>
            ))}
          </ul>

          {multiple && (
            <p className="text-xs text-gray-500 mt-3">
              Multiple images are supported. For now, the first uploaded
              image will be saved with the product. Gallery support will
              be added in the next upgrade.
            </p>
          )}
        </div>
      )}
    </div>
  );
}