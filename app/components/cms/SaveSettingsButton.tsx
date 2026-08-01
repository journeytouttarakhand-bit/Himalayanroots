"use client";

interface SaveSettingsButtonProps {
  loading: boolean;
  onClick: () => void;
}

export default function SaveSettingsButton({
  loading,
  onClick,
}: SaveSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white transition-all duration-300 ${
        loading
          ? "cursor-not-allowed bg-gray-400"
          : "bg-green-700 hover:bg-green-800"
      }`}
    >
      {loading ? (
        <>
          <svg
            className="mr-2 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />

            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          Saving...
        </>
      ) : (
        <>
          💾 Save Changes
        </>
      )}
    </button>
  );
}