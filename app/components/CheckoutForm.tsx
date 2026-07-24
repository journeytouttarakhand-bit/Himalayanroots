"use client";

type CheckoutFormProps = {
  form: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    notes: string;
  };

  couponCode: string;

  couponLoading: boolean;

  couponMessage: string;

  couponApplied: boolean;

  handleCouponChange: (
    value: string
  ) => void;

  applyCoupon: () => void;

  removeCoupon: () => void;

  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => void;

  handleSubmit: (
    e: React.FormEvent
  ) => void;
};

export default function CheckoutForm({
  form,

  couponCode,

  couponLoading,

  couponMessage,

  couponApplied,

  handleCouponChange,

  applyCoupon,

  removeCoupon,

  handleChange,

  handleSubmit,
}: CheckoutFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold mb-8 text-green-900">
        Billing Details
      </h2>

      <div className="space-y-5">
      {/* Coupon Section */}

      <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

        <h3 className="mb-4 text-xl font-bold text-green-900">
          Apply Coupon
        </h3>

        <div className="flex flex-col gap-3 md:flex-row">

          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) =>
              handleCouponChange(
                e.target.value.toUpperCase()
              )
            }
            disabled={
              couponApplied ||
              couponLoading
            }
            className="flex-1 rounded-xl border border-gray-300 bg-white p-4 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:bg-gray-100"
          />

          {couponApplied ? (

            <button
              type="button"
              onClick={removeCoupon}
              className="rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700"
            >
              Remove
            </button>

          ) : (

            <button
              type="button"
              onClick={applyCoupon}
              disabled={
                couponLoading ||
                couponCode.trim() === ""
              }
              className="rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:bg-gray-400"
            >
              {couponLoading
                ? "Applying..."
                : "Apply"}
            </button>

          )}

        </div>

        {couponMessage && (

          <div
            className={`mt-4 rounded-lg p-4 text-sm font-medium ${
              couponApplied
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {couponMessage}
          </div>

        )}

      </div>
      <button
        type="submit"
        className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold text-lg transition"
      >
        Place Order
      </button>

    </form>
  );
}