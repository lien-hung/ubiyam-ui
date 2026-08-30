export type ProductVariant = {
  id: number;
  label: string;
  price: number;
  compareAtPrice?: number;
  productId: number;
};

export type ProductVariantRequest = {
  label: string;
  price: number;
  compareAtPrice?: number;
  productId: number;
};

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
  variants: ProductVariant[];
};