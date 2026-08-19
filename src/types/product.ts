import type { Bundle } from "./bundle";

export type ProductRequest = {
  title: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  status: string;
  tags: string;
  image: string;
  description: string;
};

export type Product = {
  id: number;
  title: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  status: string;
  tags: string;
  image: string;
  description: string;
  bundles: Bundle[];
};