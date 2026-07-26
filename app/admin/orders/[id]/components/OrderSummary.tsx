"use client";

interface Props {
  totalAmount: number;
  finalAmount?: number;
  originalAmount?: number;
  discount?: number;
}

export default function OrderSummary({
  totalAmount,
  finalAmount,
  originalAmount,
  discount,
}: Props) {
  const subtotal =
    originalAmount && originalAmount > 0
      ? originalAmount
      : totalAmount;

  const totalDiscount =
    discount ??
    Math.max(
      subtotal - (finalAmount ?? totalAmount),
      0
    );

  const grandTotal =
    finalAmount ?? totalAmount;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-green-800">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-semibold">
            ₹
            {subtotal.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">
            Discount
          </span>

          <span className="font-semibold text-red-600">
            - ₹
            {totalDiscount.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">
            Shipping
          </span>

          <span className="font-semibold text-green-700">
            FREE
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">
            GST
          </span>

          <span className="font-semibold">
            Included
          </span>

        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold text-green-700">

          <span>
            Grand Total
          </span>

          <span>
            ₹
            {grandTotal.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

      </div>

    </div>
  );
}