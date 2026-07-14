export default function Features() {
  const features = [
    { icon: "🌿", title: "100% Natural" },
    { icon: "👨‍🌾", title: "Farmer Direct" },
    { icon: "🏔️", title: "From the Himalayas" },
    { icon: "🌾", title: "No Chemicals\nNo Additives" },
  ];

  return (
    <section className="bg-green-900 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {features.map((item, index) => (
          <div key={index} className="text-white">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-700 flex items-center justify-center text-3xl">
              {item.icon}
            </div>

            <h3 className="mt-3 font-semibold whitespace-pre-line">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}