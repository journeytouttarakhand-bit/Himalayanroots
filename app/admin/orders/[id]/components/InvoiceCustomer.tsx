"use client";

type Customer = {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
};

type Props = {
  customer: Customer;
};

export default function InvoiceCustomer({
  customer,
}: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">

      {/* Billing Details */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-5 border-b pb-4">

          <h2 className="text-2xl font-bold text-green-800">
            Billing Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Customer billing information
          </p>

        </div>

        <div className="space-y-4">

          <div>

            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="text-lg font-semibold">
              {customer.name}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Phone Number
            </p>

            <p className="font-medium">
              {customer.phone}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Email Address
            </p>

            <p className="font-medium break-all">
              {customer.email || "Not Available"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Billing Address
            </p>

            <div className="mt-2 rounded-xl bg-gray-50 p-4">

              <p>{customer.address}</p>

              <p className="mt-1">
                {customer.city}, {customer.state}
              </p>

              <p>{customer.pincode}</p>

            </div>

          </div>

        </div>

      </div>

      {/* Shipping Details */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-5 border-b pb-4">

          <h2 className="text-2xl font-bold text-green-800">
            Shipping Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Delivery destination
          </p>

        </div>

        <div className="space-y-4">

          <div>

            <p className="text-sm text-gray-500">
              Receiver Name
            </p>

            <p className="text-lg font-semibold">
              {customer.name}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Contact Number
            </p>

            <p className="font-medium">
              {customer.phone}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Shipping Address
            </p>

            <div className="mt-2 rounded-xl bg-gray-50 p-4">

              <p>{customer.address}</p>

              <p className="mt-1">
                {customer.city}, {customer.state}
              </p>

              <p>{customer.pincode}</p>

            </div>

          </div>

          {customer.notes && (

            <div>

              <p className="text-sm text-gray-500">
                Customer Notes
              </p>

              <div className="mt-2 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm">

                {customer.notes}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}