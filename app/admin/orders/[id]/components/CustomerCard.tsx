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

interface Props {
  customer: Customer;
}

export default function CustomerCard({
  customer,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-green-800">
        Customer Details
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-500">
            Customer Name
          </p>

          <p className="text-lg font-semibold">
            {customer.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Phone Number
          </p>

          <p className="font-semibold">
            {customer.phone}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <p className="font-semibold break-all">
            {customer.email || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Address
          </p>

          <p className="font-semibold">
            {customer.address}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">

          <div>
            <p className="text-sm text-gray-500">
              City
            </p>

            <p className="font-semibold">
              {customer.city}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              State
            </p>

            <p className="font-semibold">
              {customer.state}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Pincode
            </p>

            <p className="font-semibold">
              {customer.pincode}
            </p>
          </div>

        </div>

        {customer.notes && (

          <div>

            <p className="text-sm text-gray-500">
              Customer Notes
            </p>

            <p className="rounded-lg bg-gray-50 p-3">
              {customer.notes}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}