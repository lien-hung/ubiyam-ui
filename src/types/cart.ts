export type CartItem = {
  key: number;
  productId: number;
  title: string;
  image?: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  isGift?: boolean;
};