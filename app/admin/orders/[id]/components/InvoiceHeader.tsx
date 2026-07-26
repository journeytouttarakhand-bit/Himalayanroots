"use client";

type Props = {
  orderId: string;
  paymentId?: string;
  invoiceNumber: string;
  orderDate: string;
  paymentStatus: string;
  orderStatus: string;
};

export default function InvoiceHeader({
  orderId,
  paymentId,
  invoiceNumber,
  orderDate,
  paymentStatus,
  orderStatus,
}: Props) {
  return (
    <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-700 to-green-800 p-8 text-white shadow-lg">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-center gap-5">

          <img
            src="https://res.cloudinary.com/ss75t6eb/image/upload/v1784422328/HR-Photoroom_dfzxnk.png"
            alt="Himalayan Roots"
            className="h-24 w-24 rounded-full bg-white p-2"
            crossOrigin="anonymous"
          />

          <div>

            <h1 className="text-4xl font-bold tracking-wide">
              Himalayan Roots
            </h1>

            <p className="mt-2 text-green-100">
              Pure Taste of Uttarakhand
            </p>

            <p className="mt-4 text-sm leading-7 text-green-100">
              Mussoorie, Uttarakhand, India
              <br />
              support@himalayanroots.in
              <br />
              +91 7895943324
              <br />
              www.himalayanroots.in
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

          <h2 className="mb-5 text-3xl font-bold">
            TAX INVOICE
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between gap-8">
              <span className="text-green-100">
                Invoice No
              </span>

              <span className="font-semibold">
                {invoiceNumber}
              </span>
            </div>

            <div className="flex justify-between gap-8">
              <span className="text-green-100">
                Order ID
              </span>

              <span className="font-semibold break-all">
                {orderId}
              </span>
            </div>

            <div className="flex justify-between gap-8">
              <span className="text-green-100">
                Payment ID
              </span>

              <span className="font-semibold break-all">
                {paymentId || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-8">
              <span className="text-green-100">
                Order Date
              </span>

              <span className="font-semibold">
                {new Date(orderDate).toLocaleString("en-IN")}
              </span>
            </div>

          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                paymentStatus === "Paid"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {paymentStatus}
            </span>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                orderStatus === "Delivered"
                  ? "bg-green-500"
                  : orderStatus === "Shipped"
                  ? "bg-blue-500"
                  : orderStatus === "Processing"
                  ? "bg-yellow-500 text-black"
                  : orderStatus === "Confirmed"
                  ? "bg-cyan-500"
                  : orderStatus === "Cancelled"
                  ? "bg-red-600"
                  : "bg-gray-500"
              }`}
            >
              {orderStatus}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}