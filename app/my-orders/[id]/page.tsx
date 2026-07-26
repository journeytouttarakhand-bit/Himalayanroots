"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    slug: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
};

const orderSteps = [

  "Pending",

  "Confirmed",

  "Packed",

  "Shipped",

  "Out for Delivery",

  "Delivered",

];
export default function OrderDetailsPage() {

  const { id } =
    useParams();

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadOrder();

  }, []);

  async function loadOrder() {

    try {

      const res =
        await fetch(
          `/api/my-orders/${id}`,
          {
            cache: "no-store",
          }
        );

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

        Order not found.

      </div>
    );

  }

  return (

    <div className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-green-900">

          Order Details

        </h1>

        <Link
          href="/my-orders"
          className="rounded-lg bg-gray-200 px-5 py-3 font-semibold"
        >

          ← Back

        </Link>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-2xl font-bold">

              Ordered Products

            </h2>

            <div className="space-y-5">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-5 border-b pb-5"
                >

                  <Image
                    src={item.image}
                    alt={item.name}
                    width={90}
                    height={90}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-bold">

                      {item.name}

                    </h3>

                    <p className="mt-2">

                      Qty :
                      {" "}
                      {item.quantity}

                    </p>

                    <p>

                      ₹{item.price}

                    </p>

                  </div>

                  <div className="font-bold text-green-700">

                    ₹
                    {item.price *
                      item.quantity}

                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-2xl font-bold">

              Delivery Address

            </h2>

            <p>

              {order.customer.name}

            </p>

            <p>

              {order.customer.phone}

            </p>

            <p>

              {order.customer.address}

            </p>

            <p>

              {order.customer.city},
              {" "}
              {order.customer.state}

            </p>

            <p>

              {order.customer.pincode}

            </p>

            {order.customer.notes && (

              <p className="mt-3 text-gray-600">

                Note :
                {" "}
                {order.customer.notes}

              </p>

            )}

          </div>

        </div>

        <div>

<div className="mb-6 rounded-xl bg-white p-6 shadow">

  <h2 className="mb-6 text-2xl font-bold">

    Order Tracking

  </h2>

  <div className="space-y-5">

    {orderSteps.map(

      (step, index) => {

        const active =
          orderSteps.indexOf(
            order.orderStatus
          ) >= index;

        return (

          <div
            key={step}
            className="flex items-center gap-4"
          >

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-bold ${
                active
                  ? "bg-green-700"
                  : "bg-gray-300"
              }`}
            >

              {index + 1}

            </div>

            <div>

              <h3
                className={`font-semibold ${
                  active
                    ? "text-green-700"
                    : "text-gray-500"
                }`}
              >

                {step}

              </h3>

            </div>

          </div>

        );

      }

    )}

  </div>

</div>
          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-2xl font-bold">

              Summary

            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">

                <span>

                  Order Status

                </span>

                <strong>

                  {order.orderStatus}

                </strong>

              </div>

              <div className="flex justify-between">

                <span>

                  Payment

                </span>

                <strong>

                  {order.paymentStatus}

                </strong>

              </div>

              <div className="flex justify-between">

                <span>

                  Original Amount

                </span>

                <strong>

                  ₹{order.totalAmount}

                </strong>

              </div>

              <div className="flex justify-between">

                <span>

                  Discount

                </span>

                <strong>

                  ₹{order.discount}

                </strong>

              </div>

              <div className="flex justify-between">

                <span>

                  Coupon

                </span>

                <strong>

                  {order.couponCode ||
                    "-"}

                </strong>

              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold text-green-700">

                <span>

                  Total Paid

                </span>

                <span>

                  ₹{order.finalAmount}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}