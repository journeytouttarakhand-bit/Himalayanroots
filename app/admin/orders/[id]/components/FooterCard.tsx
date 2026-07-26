"use client";

export default function FooterCard() {
  return (
    <div className="rounded-2xl border bg-green-50 p-8">

      <div className="flex flex-col items-center text-center">

        <img
          src="https://res.cloudinary.com/ss75t6eb/image/upload/v1784422328/HR-Photoroom_dfzxnk.png"
          alt="Himalayan Roots"
          className="mb-5 h-20 w-20"
          crossOrigin="anonymous"
        />

        <h2 className="text-3xl font-bold text-green-800">
          Thank You For Shopping ❤️
        </h2>

        <p className="mt-3 text-gray-700">
          We sincerely appreciate your trust in Himalayan Roots.
        </p>

        <p className="mt-2 text-gray-600">
          We hope you enjoy the authentic taste of Uttarakhand.
        </p>

        <div className="mt-8 space-y-2 text-gray-700">

          <p>
            🌐 www.himalayanroots.in
          </p>

          <p>
            📧 support@himalayanroots.in
          </p>

          <p>
            📞 +91 7895943324
          </p>

          <p>
            📍 Mussoorie, Uttarakhand, India
          </p>

        </div>

      </div>

    </div>
  );
}