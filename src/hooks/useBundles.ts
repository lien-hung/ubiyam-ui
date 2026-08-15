import { useMemo } from "react";
import type { Bundle, BundleGift } from "../types/bundle";
import type { Product } from "../types/product";

export interface BundleWithProducts extends Bundle {
  product: Product;
  giftProducts: Product[];
}

export interface BundleDiscount {
  percentage: number;
  savings: number;
}

/**
 * Custom hook for bundle-related utilities and operations
 */
export function useBundles() {
  /**
   * Calculate the discount percentage and savings for a bundle
   */
  const calculateDiscount = useMemo(() => {
    return (bundle: Bundle): BundleDiscount | null => {
      if (!bundle.product) return null;

      const basePrice = bundle.product.price * bundle.buyQuantity;
      const totalValue = (bundle.product.price * (bundle.buyQuantity + bundle.getQuantity));
      
      if (basePrice === 0) return null;

      const savings = totalValue - basePrice;
      const percentage = Math.round((savings / totalValue) * 100);

      return {
        percentage,
        savings: Math.round(savings * 100) / 100,
      };
    };
  }, []);

  /**
   * Calculate the total value of free gifts in a bundle
   */
  const calculateGiftsValue = useMemo(() => {
    return (bundle: Bundle): number => {
      return (bundle.freeGifts || []).reduce((total, gift) => {
        const giftPrice = gift.product?.price || 0;
        return total + giftPrice * gift.quantity;
      }, 0);
    };
  }, []);

  /**
   * Validate if a bundle has all required fields
   */
  const isValidBundle = useMemo(() => {
    return (bundle: Partial<Bundle>): boolean => {
      return (
        !!bundle.title &&
        !!bundle.product &&
        (bundle.buyQuantity || 0) > 0 &&
        (bundle.getQuantity || 0) > 0
      );
    };
  }, []);

  /**
   * Validate if a gift is properly configured
   */
  const isValidGift = useMemo(() => {
    return (gift: Partial<BundleGift>): boolean => {
      return (
        !!gift.product &&
        !!gift.text &&
        (gift.quantity || 0) > 0
      );
    };
  }, []);

  /**
   * Format bundle display text
   */
  const formatBundleLabel = useMemo(() => {
    return (bundle: Bundle): string => {
      const buy = bundle.buyQuantity;
      const get = bundle.getQuantity;
      return `Buy ${buy} Get ${get} Free`;
    };
  }, []);

  /**
   * Get the total number of items in a bundle (including free items)
   */
  const getBundleItemCount = useMemo(() => {
    return (bundle: Bundle): number => {
      let count = bundle.buyQuantity + bundle.getQuantity;
      count += (bundle.freeGifts || []).reduce((total, gift) => total + gift.quantity, 0);
      return count;
    };
  }, []);

  /**
   * Check if a bundle has free gifts
   */
  const hasFreeGifts = useMemo(() => {
    return (bundle: Bundle): boolean => {
      return (bundle.freeGifts || []).length > 0;
    };
  }, []);

  /**
   * Sort bundles by discount percentage (highest first)
   */
  const sortByDiscount = useMemo(() => {
    return (bundles: Bundle[]): Bundle[] => {
      return [...bundles].sort((a, b) => {
        const discountA = calculateDiscount(a);
        const discountB = calculateDiscount(b);

        const percentA = discountA?.percentage || 0;
        const percentB = discountB?.percentage || 0;

        return percentB - percentA;
      });
    };
  }, [calculateDiscount]);

  return {
    calculateDiscount,
    calculateGiftsValue,
    isValidBundle,
    isValidGift,
    formatBundleLabel,
    getBundleItemCount,
    hasFreeGifts,
    sortByDiscount,
  };
}
