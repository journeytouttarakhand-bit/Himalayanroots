"use client";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({
  label,
  value,
  onChange,
}: ColorPickerProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-green-800">
        {label}
      </h2>

      <div className="flex flex-col gap-6 md:flex-row md:items-center">

        <input
          type="color"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="h-20 w-20 cursor-pointer rounded-xl border"
        />

        <div className="flex-1">

          <label className="mb-2 block text-sm font-medium text-gray-600">
            Hex Color
          </label>

          <input
            type="text"
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            placeholder="#166534"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
          />

          <p className="mt-3 text-sm text-gray-500">
            Choose a color using the picker or enter a HEX value manually.
          </p>

        </div>

      </div>

      <div className="mt-6">

        <p className="mb-3 text-sm font-medium text-gray-600">
          Live Preview
        </p>

        <div
          className="h-16 w-full rounded-xl border"
          style={{
            backgroundColor: value,
          }}
        />

      </div>

    </div>
  );
}