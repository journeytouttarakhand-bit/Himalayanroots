"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  createdAt: string;
  paymentStatus: string;
  orderStatus: string;

  totalAmount: number;
  discount: number;
  finalAmount: number;
  couponCode: string;

  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    notes: string;
  };

  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
};

export default function InvoicePage() {

  const { id } = useParams();

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadInvoice();

  }, []);

  async function loadInvoice() {

    try {

      const res =
        await fetch(`/api/invoice/${id}`);

      const data =
        await res.json();

      if (data.success) {

        setOrder(data.order);

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  }

  if (loading) {

    return (

      <div className="mx-auto max-w-7xl p-10">

        Loading...

      </div>

    );

  }

  if (!order) {

    return (

      <div className="mx-auto max-w-7xl p-10">

        Invoice not found.

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-5xl px-6 py-10">

      <div className="rounded-xl bg-white p-10 shadow">

        <div className="flex items-center justify-between border-b pb-8">

          <div className="flex items-center gap-5">

            <Image
              src="/logo.png"
              alt="Logo"
              width={70}
              height={70}
              className="rounded-full"
            />

            <div>

              <h1 className="text-3xl font-bold text-green-800">

                Himalayan Roots

              </h1>

              <p className="text-gray-500">

                Pure Taste of Uttarakhand

              </p>

            </div>

          </div>

          <div className="text-right">

            <h2 className="text-3xl font-bold">

              INVOICE

            </h2>

            <p>

              #{order._id.slice(-8)}

            </p>

            <p className="mt-2 text-sm">

              {new Date(
                order.createdAt
              ).toLocaleDateString()}

            </p>

          </div>

        </div>
                <div className="mt-10 grid gap-8 md:grid-cols-2">

          <div>

            <h3 className="mb-3 text-xl font-bold">

              Bill To

            </h3>

            <p className="font-semibold">

              {order.customer.name}

            </p>

            <p>

              {order.customer.phone}

            </p>

            {order.customer.email && (

              <p>

                {order.customer.email}

              </p>

            )}

            <p className="mt-2">

              {order.customer.address}

            </p>

            <p>

              {order.customer.city},{" "}
              {order.customer.state}

            </p>

            <p>

              {order.customer.pincode}

            </p>

          </div>

          <div className="text-right">

            <h3 className="mb-3 text-xl font-bold">

              Order Details

            </h3>

            <p>

              <strong>
                Order Status:
              </strong>{" "}

              {order.orderStatus}

            </p>

            <p>

              <strong>
                Payment:
              </strong>{" "}

              {order.paymentStatus}

            </p>

            <p>

              <strong>
                Coupon:
              </strong>{" "}

              {order.couponCode || "-"}

            </p>

          </div>

        </div>

        <div className="mt-10 overflow-x-auto">

          <table className="w-full border">

            <thead className="bg-green-700 text-white">

              <tr>

                <th className="p-3 text-left">

                  Product

                </th>

                <th className="p-3">

                  Qty

                </th>

                <th className="p-3">

                  Price

                </th>

                <th className="p-3">

                  Total

                </th>

              </tr>

            </thead>

            <tbody>

              {order.items.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-3">

                    <div className="flex items-center gap-3">

                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />

                      <span>

                        {item.name}

                      </span>

                    </div>

                  </td>

                  <td className="text-center">

                    {item.quantity}

                  </td>

                  <td className="text-center">

                    ₹{item.price}

                  </td>

                  <td className="text-center font-semibold">

                    ₹
                    {item.price *
                      item.quantity}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
            <div className="mt-10 flex justify-end">

          <div className="w-full max-w-md space-y-3 rounded-xl border p-6">

            <div className="flex justify-between">

              <span>

                Subtotal

              </span>

              <strong>

                ₹{order.totalAmount}

              </strong>

            </div>

            <div className="flex justify-between">

              <span>

                Discount

              </span>

              <strong className="text-green-700">

                - ₹{order.discount}

              </strong>

            </div>

            <div className="border-t pt-3">

              <div className="flex justify-between text-2xl font-bold text-green-800">

                <span>

                  Grand Total

                </span>

                <span>

                  ₹{order.finalAmount}

                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 flex items-center justify-between border-t pt-8">

          <div>

            <p className="font-semibold">

              Thank you for shopping with Himalayan Roots ❤️

            </p>

            <p className="mt-2 text-sm text-gray-500">

              Pure Taste of Uttarakhand

            </p>

          </div>

          <button
            onClick={() => window.print()}
            className="rounded-lg bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800 print:hidden"
          >

            Print Invoice

          </button>

        </div>

      </div>

    </div>

  );

}