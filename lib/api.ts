export async function getProducts() {
  const res = await fetch("http://localhost:3000/api/all-products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data.products;
}