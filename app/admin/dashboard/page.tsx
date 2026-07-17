"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  _id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (!loggedIn) {
      router.push("/admin/login");
      return;
    }

    fetchOrders();
  }, [router]);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, orderStatus: string) {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus,
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchOrders();
        alert("Order Status Updated Successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  }

  function logout() {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-green-900">
          Himalayan Roots Admin
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="bg-green-700 text-white rounded-xl p-6 mb-8">

        <h2 className="text-2xl font-bold">
          Total Orders : {orders.length}
        </h2>

      </div>

      {orders.length === 0 ? (
        <div className="text-center text-xl">
          No Orders Found
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg border p-6"
            >

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <h2 className="text-2xl font-bold text-green-900">
                    {order.customer.name}
                  </h2>

                  <p>{order.customer.phone}</p>

                  <p>{order.customer.address}</p>

                  <p>
                    {order.customer.city}, {order.customer.state}
                  </p>

                  <p>{order.customer.pincode}</p>

                </div>

                <div className="text-right">

                  <h2 className="text-3xl font-bold text-green-700">
                    ₹{order.totalAmount}
                  </h2>

                  <p className="mt-3">
                    Payment :
                    <span className="font-bold text-green-700 ml-2">
                      {order.paymentStatus}
                    </span>
                  </p>

                  <div className="mt-4">

                    <label className="font-semibold mr-3">
                      Order Status:
                    </label>

                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </div>

                  <p className="text-gray-500 mt-4">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}