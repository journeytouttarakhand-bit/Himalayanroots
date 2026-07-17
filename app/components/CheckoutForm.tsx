"use client";

type CheckoutFormProps = {
  form: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    notes: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function CheckoutForm({
  form,
  handleChange,
  handleSubmit,
}: CheckoutFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold mb-8 text-green-900">
        Billing Details
      </h2>

      <div className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          rows={4}
          required
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            className="border rounded-xl p-4"
          />
        </div>

        <textarea
          name="notes"
          placeholder="Order Notes (Optional)"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold text-lg transition"
      >
        Place Order
      </button>
    </form>
  );
}