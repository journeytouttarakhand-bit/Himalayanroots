"use client";

type OrderItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Props = {
  items: OrderItem[];
};

export default function InvoiceProducts({
  items,
}: Props) {
  const grandTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold text-green-800">
          Ordered Products
        </h2>

        <p className="mt-2 text-gray-500">
          Complete list of purchased products
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-green-700 text-white">

            <tr>

              <th className="px-6 py-4 text-left">
                Product
              </th>

              <th className="px-6 py-4 text-center">
                SKU
              </th>

              <th className="px-6 py-4 text-center">
                Price
              </th>

              <th className="px-6 py-4 text-center">
                Qty
              </th>

              <th className="px-6 py-4 text-center">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => (

              <tr
                key={`${item.id}-${index}`}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }
              >

                <td className="border-b px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl border object-cover"
                      crossOrigin="anonymous"
                    />

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Authentic Himalayan Product
                      </p>

                    </div>

                  </div>

                </td>

                <td className="border-b px-6 py-5 text-center font-mono text-sm text-gray-600">

                  {item.slug}

                </td>

                <td className="border-b px-6 py-5 text-center font-semibold">

                  ₹{item.price.toLocaleString("en-IN")}

                </td>

                <td className="border-b px-6 py-5 text-center">

                  {item.quantity}

                </td>

                <td className="border-b px-6 py-5 text-center font-bold text-green-700">

                  ₹{(
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}

                </td>

              </tr>

            ))}

          </tbody>

          <tfoot>

            <tr className="bg-green-50">

              <td
                colSpan={4}
                className="px-6 py-5 text-right text-xl font-bold"
              >
                Grand Total
              </td>

              <td className="px-6 py-5 text-center text-2xl font-bold text-green-700">

                ₹{grandTotal.toLocaleString("en-IN")}

              </td>

            </tr>

          </tfoot>

        </table>

      </div>

    </div>
  );
}