"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  User as UserIcon,
  Package,
  MapPin,
  Key,
  Loader2,
  CheckCircle2,
  Camera,
  CreditCard,
  Lock,
} from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  altPhone?: string;
  gender?: string;
  dob?: string;
  avatar?: string;
  address?: string;
  locality?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pincode?: string;
};

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

type Order = {
  _id: string;
  totalAmount: number;
  finalAmount?: number;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
  items: OrderItem[];
};

function ProfileContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "address" | "security">("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    altPhone: "",
    gender: "Male",
    dob: "",
    avatar: "",
    address: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (tabParam === "orders") {
      setActiveTab("orders");
    } else if (tabParam === "addresses" || tabParam === "address") {
      setActiveTab("address");
    } else if (tabParam === "security") {
      setActiveTab("security");
    } else {
      setActiveTab("profile");
    }
  }, [tabParam]);

  useEffect(() => {
    loadUserData();
    loadUserOrders();
  }, []);

  async function loadUserData() {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();

      if (data.success && data.user) {
        setUser(data.user);
        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          altPhone: data.user.altPhone || "",
          gender: data.user.gender || "Male",
          dob: data.user.dob || "",
          avatar: data.user.avatar || "",
          address: data.user.address || "",
          locality: data.user.locality || "",
          landmark: data.user.landmark || "",
          city: data.user.city || "",
          state: data.user.state || "",
          pincode: data.user.pincode || "",
        });
      }
    } catch (error) {
      console.error("User load error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadUserOrders() {
    try {
      const res = await fetch("/api/user/orders", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Orders load error:", error);
    }
  }

  // Single Avatar Upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      setSuccessMsg("");
      setErrorMsg("");

      const dataForm = new FormData();
      dataForm.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: dataForm,
      });

      const data = await res.json();
      if (data.url || data.secure_url) {
        const uploadedUrl = data.url || data.secure_url;
        setFormData((prev) => ({ ...prev, avatar: uploadedUrl }));
        setSuccessMsg("Photo uploaded! Click 'Save Profile Details' below to save changes.");
      } else {
        setErrorMsg("Image upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg("Error uploading profile image.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Profile details updated successfully!");
        loadUserData();
      } else {
        setErrorMsg(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setErrorMsg("Error updating profile details.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMsg("New password and Confirm password do not match.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Password updated successfully!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setErrorMsg(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Password update error:", error);
      setErrorMsg("Error changing password.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-800" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="text-3xl font-bold text-emerald-950 mb-8">My Account</h1>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Left Sidebar */}
        <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm h-fit">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${
              activeTab === "profile"
                ? "bg-emerald-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <UserIcon size={18} /> Profile Overview
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${
              activeTab === "orders"
                ? "bg-emerald-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Package size={18} /> My Orders & Payment
          </button>

          <button
            onClick={() => setActiveTab("address")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${
              activeTab === "address"
                ? "bg-emerald-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MapPin size={18} /> Saved Address
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${
              activeTab === "security"
                ? "bg-emerald-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Key size={18} /> Change Password
          </button>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          {successMsg && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 p-4 border border-green-200 text-green-800 font-medium text-sm">
              <CheckCircle2 size={18} />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-200 text-red-800 font-medium text-sm">
              {errorMsg}
            </div>
          )}

          {/* TAB 1: PROFILE OVERVIEW */}
          {activeTab === "profile" && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
                <div className="relative group">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-emerald-700 bg-emerald-800 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                    {formData.avatar ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={formData.avatar}
                        alt={user?.name || "Avatar"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase()
                    )}
                  </div>

                  <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg hover:bg-emerald-800 transition">
                    {uploadingAvatar ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera size={16} />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <h3 className="text-base font-bold text-gray-800">Personal Information</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address (Read Only)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Alternate Phone
                    </label>
                    <input
                      type="text"
                      placeholder="Optional secondary phone"
                      value={formData.altPhone}
                      onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-900 transition disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Saving Changes..." : "Save Profile Details"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: MY ORDERS & PAYMENT HISTORY */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Order & Payment History</h2>

              {orders.length === 0 ? (
                <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
                  <Package size={48} className="mx-auto text-gray-300 mb-3" />
                  No previous orders found.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                      <div>
                        <p className="text-xs text-gray-400">Order ID: #{order._id.slice(-8)}</p>
                        <p className="text-xs font-semibold text-gray-600">
                          Placed On:{" "}
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                          Order Status: {order.orderStatus || "Processing"}
                        </span>
                      </div>
                    </div>

                    <div className="divide-y">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2.5 text-sm">
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-bold text-gray-800 border-b pb-2">
                        <CreditCard size={15} className="text-emerald-700" />
                        <span>Payment Summary</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1 text-gray-600">
                        <div>
                          Payment Status:{" "}
                          <span
                            className={`font-bold ${
                              order.paymentStatus === "Paid"
                                ? "text-green-700"
                                : "text-amber-700"
                            }`}
                          >
                            {order.paymentStatus || "Pending"}
                          </span>
                        </div>
                        <div>
                          Payment Method:{" "}
                          <span className="font-semibold text-gray-900">
                            {order.paymentMethod || "Online"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-3 font-bold text-gray-900">
                      <span>Total Amount Paid:</span>
                      <span className="text-emerald-800 text-lg">
                        ₹{(order.finalAmount || order.totalAmount || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: MANAGE ADDRESS */}
          {activeTab === "address" && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Delivery Address</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    House / Flat / Building No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. House No. 42, Green Apartments"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Street / Area / Locality
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajpur Road"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Clock Tower"
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      placeholder="Dehradun"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      placeholder="Uttarakhand"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="248001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-900 transition cursor-pointer"
                >
                  Save Address Details
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: CHANGE PASSWORD */}
          {activeTab === "security" && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <Lock className="text-emerald-800 h-6 w-6" />
                <h2 className="text-xl font-bold text-gray-900">Change Account Password</h2>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-900 transition disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Updating Password..." : "Update Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-800" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}