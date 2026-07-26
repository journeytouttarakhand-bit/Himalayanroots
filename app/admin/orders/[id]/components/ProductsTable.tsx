"use client";

type OrderItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

interface Props {
  items: OrderItem[];
}

export default function ProductsTable({
  items,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold text-green-800">
          Ordered Products
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-700 text-white">

            <tr>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-center">
                Price
              </th>

              <th className="p-4 text-center">
                Qty
              </th>

              <th className="p-4 text-center">
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

                <td className="border-b p-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl border object-cover"
                    />

                    <div>

                      <p className="text-lg font-semibold">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.slug}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="border-b text-center font-medium">
                  ₹{item.price.toLocaleString("en-IN")}
                </td>

                <td className="border-b text-center">
                  {item.quantity}
                </td>

                <td className="border-b text-center font-bold text-green-700">
                  ₹{(
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}
                </td>

              </tr>

            ))}

            {items.length === 0 && (

              <tr>

                <td
                  colSpan={4}
                  className="py-10 text-center text-gray-500"
                >
                  No Products Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}