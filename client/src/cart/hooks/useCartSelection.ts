import { useEffect, useRef, useState } from 'react';
import type { CartItemResponse } from '../apis/cart';

export const useCartSelection = (cartItems: CartItemResponse[]) => {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current || cartItems.length === 0) return;

    setSelectedProductIds(cartItems.map((item) => item.product.id));
    hasInitialized.current = true;
  }, [cartItems]);

  const isAllSelected =
    cartItems.length > 0 && selectedProductIds.length === cartItems.length;

  const toggleItem = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const toggleAll = () => {
    setSelectedProductIds(
      isAllSelected ? [] : cartItems.map((i) => i.product.id),
    );
  };

  const deselectItem = (productId: string) => {
    setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
  };

  return {
    selectedProductIds,
    isAllSelected,
    toggleItem,
    toggleAll,
    deselectItem,
  };
};
