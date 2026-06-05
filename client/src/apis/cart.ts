export interface Product {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
}

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch('/api/cart/');

  if (!response.ok) {
    throw new Error('장바구니 상품 목록을 불러오지 못했습니다.');
  }

  const data: CartResponse = await response.json();

  return data.items;
};
