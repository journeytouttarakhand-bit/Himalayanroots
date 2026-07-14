import Header from "../components/Header";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold text-green-900 mb-6">
          About Himalayan Roots
        </h1>

        <p className="text-lg leading-8 text-gray-700">
          Himalayan Roots brings authentic and natural products directly
          from the farmers of Uttarakhand to homes across India.
        </p>
      </div>
    </>
  );
}