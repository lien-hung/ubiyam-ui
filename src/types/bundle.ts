import type { Product } from "./product";

export type BundleGiftRequest = {
  bundleId: number;
  productId: number;
  giftType: string;
  text: string;
  quantity: number;
  showPrice: boolean;
};

export type BundleGift = {
  id: number;
  giftType: string;
  text: string;
  quantity: number;
  showPrice: boolean;
  productId: number;
  product: Product;
};

export type BundleRequest = {
  title: string;
  subtitle: string;
  badgeText: string;
  imageUrl: string;
  productId: number;
  buyQuantity: number;
  getQuantity: number;
};

export type Bundle = {
  id: number;
  title: string;
  subtitle: string;
  badgeText: string;
  imageUrl: string;
  buyQuantity: number;
  getQuantity: number;
  productId: number;
  freeGifts: BundleGift[];
};