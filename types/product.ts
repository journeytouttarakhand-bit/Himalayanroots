export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  rating: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}