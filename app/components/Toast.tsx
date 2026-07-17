"use client";

type ToastProps = {
  message: string;
  show: boolean;
};

export default function Toast({
  message,
  show,
}: ToastProps) {
  return (
    <div
      className={`fixed top-24 right-6 z-50 transition-all duration-500 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-5 pointer-events-none"
      }`}
    >
      <div className="bg-green-700 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">

        <span className="text-2xl">
          ✅
        </span>

        <span className="font-semibold">
          {message}
        </span>

      </div>
    </div>
  );
}