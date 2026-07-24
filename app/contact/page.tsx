export default function ContactPage() {
  return (
    <main className="min-h-screen bg-green-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-green-900 mb-6">
          Contact Us
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          We'd love to hear from you. Contact Himalayan Roots for any
          questions about our products or your orders.
        </p>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <p><strong>Email:</strong> support@himalayanroots.in</p>
          <p><strong>Phone:</strong> +91 7895943324</p>
          <p><strong>Address:</strong> Mussoorie, Uttarakhand, India</p>
        </div>
      </div>
    </main>
  );
}